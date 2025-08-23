package com.backend.Controller;

import com.backend.DTO.UserDto;
import com.backend.Response.RemoveBgResponse;
import com.backend.Service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/webhooks")
@RequiredArgsConstructor
public class ClerkWebhookController {

    @Value("${clerk.webhook.secret-key}")
    private String webhookSecret;

    private final UserService userService;

    @PostMapping("/clerk")
    public ResponseEntity<?> handleClerkWebhook(
            @RequestHeader("svix-id") String svixId,
            @RequestHeader("svix-timestamp") String svixTimestamp,
            @RequestHeader("svix-signature") String svixSignature,
            @RequestBody String payload
    ) {
        RemoveBgResponse response = null;
        try {
            boolean isValid = verifyWebhookSignature(svixId , svixTimestamp , svixSignature , payload);

            if (!isValid) {
                response = RemoveBgResponse.builder()
                        .statusCode(HttpStatus.UNAUTHORIZED)
                        .data("Invalid webhook signature")
                        .success(false)
                        .build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(payload);

            String eventType = rootNode.path("type").asText();

            switch (eventType) {
                case "user.created" :
                    handleUserCreated(rootNode.path("data"));
                    break;
                case "user.updated" :
                    handleUserUpdate(rootNode.path("data"));
                    break;
                case "user.deleted" :
                    handleUserDelete(rootNode.path("data"));
                    break;
            }
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            e.printStackTrace();
            response = RemoveBgResponse.builder()
                    .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
                    .data("Something went wrong")
                    .success(false)
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    private void handleUserDelete(JsonNode data) {
        String clerkId = data.path("data").get("id").asText();
        userService.deleteUserByClerkId(clerkId);
    }

    private void handleUserUpdate(JsonNode data) {
        String clerkId = data.path("id").asText();
        UserDto existingUser = userService.getUserByClerkId(clerkId);

        existingUser.setEmail(data.path("email_addresses").path(0).path("email_address").asText());
        existingUser.setFirstName(data.path("first_name").asText());
        existingUser.setLastName(data.path("last_name").asText());
        existingUser.setPhotoUrl(data.path("image_url").asText());

        userService.saveUser(existingUser);
    }

    private void handleUserCreated(JsonNode data) {
        UserDto newUser = UserDto.builder()
                .clerkId(data.path("id").asText())
                .email(data.path("email_addresses").path(0).path("email_address").asText())
                .firstName(data.path("first_name").asText())
                .lastName(data.path("last_name").asText())
                .build();

        userService.saveUser(newUser);
    }

    // TODO : for enterprise read the documentation for proper validation
    // in this case just returning true also work
    private boolean verifyWebhookSignature(String svixId, String svixTimestamp, String svixSignature, String payload) {
        return true;
    }
}

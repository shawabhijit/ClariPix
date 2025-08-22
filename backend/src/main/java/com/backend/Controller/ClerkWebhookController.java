package com.backend.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/webhooks")
public class ClerkWebhookController {

    @Value("${clerk.webhook.secret-key}")
    private String webhookSecret;

    public ResponseEntity<?> handleClerkWebhook(
            @RequestHeader("svix-id") String svixId,
            @RequestHeader("svix-timestamp") String svixTimestamp,
            @RequestHeader("svix-signature") String svixSignature,
            @RequestBody String payload
    ) {
        try {
            boolean isValid = verifyWebhookSignature(svixId , svixTimestamp , svixSignature , payload);

        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    // TODO : for enterprise read the documentation for proper validation
    // in this case just returning true also work
    private boolean verifyWebhookSignature(String svixId, String svixTimestamp, String svixSignature, String payload) {
        return true;
    }
}

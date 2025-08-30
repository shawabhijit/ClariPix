package com.backend.Controller;

import com.backend.Repository.HistoryRepo;
import com.backend.Repository.UserRepo;
import com.backend.Request.HistoryRequest;
import com.backend.Response.HistoryResponse;
import com.backend.Service.Impl.HistoryServiceImpl;
import com.backend.entity.History;
import com.backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryServiceImpl historyService;
    private final UserRepo userRepo;
    private final HistoryRepo historyRepo;

    @PostMapping("/save_image")
    public ResponseEntity<?> saveHistory(@RequestBody HistoryRequest request) throws Exception {
        User user = userRepo.findByClerkId(request.getClerkId()).orElseThrow(() -> new UsernameNotFoundException("user not found"));

        if(user == null) {
            return ResponseEntity.notFound().build();
        }
        try {
            HistoryResponse response = historyService.saveHistory(request , user);
            return ResponseEntity.ok().body(response);
        }
        catch (Exception e) {
            return ResponseEntity.ok().body("Image is already present in the dataBase");
        }
    }

    @GetMapping("/get")
    public ResponseEntity<List<HistoryResponse>> getAllHistory(@RequestParam String clerkId) {
        User user = userRepo.findByClerkId(clerkId).orElseThrow(() -> new UsernameNotFoundException("user not found"));

        if(user == null) {
            return ResponseEntity.notFound().build();
        }
        List<History> history = historyService.getAllUserHistory(user.getClerkId());

        List<HistoryResponse> historyResponse = history.stream().map(
                HistoryController::mapToHistoryResponse
        ).toList();

        return ResponseEntity.ok().body(historyResponse);
    }

    @GetMapping("/get/source")
    public ResponseEntity<List<HistoryResponse>> getAllHistoryBySourceType(@RequestParam String sourceType , @RequestParam String clerkId) {

        List<History> history = historyService.getAllHistoryBySourceType(sourceType, clerkId);

        List<HistoryResponse> historyResponse = history.stream().map(
                HistoryController::mapToHistoryResponse
        ).toList();

        return ResponseEntity.ok().body(historyResponse);
    }

    @GetMapping("/get/type")
    public ResponseEntity<List<HistoryResponse>> getAllHistoryByImageType(@RequestParam String imageType, @RequestParam String clerkId) {

        List<History> history = historyService.getAllHistoryByImageType(imageType, clerkId);

        List<HistoryResponse> historyResponse = history.stream().map(
                HistoryController::mapToHistoryResponse
        ).toList();

        return ResponseEntity.ok().body(historyResponse);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteHistory(@RequestParam String image) {
        History history = historyRepo.findHistoryByImage(image);
        if (history == null) {
            throw new UsernameNotFoundException("History not found in the dataBase");
        }
        historyService.deleteHistory(history);
        return ResponseEntity.ok().body("History deleted successfully");
    }

    static HistoryResponse mapToHistoryResponse(History history) {
        return HistoryResponse.builder()
                .image(history.getImage())
                .sourceType(history.getSourceType())
                .imageType(history.getImageType())
                .build();
    }

}

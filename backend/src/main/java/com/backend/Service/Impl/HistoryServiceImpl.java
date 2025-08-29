package com.backend.Service.Impl;

import com.backend.Repository.HistoryRepo;
import com.backend.Repository.UserRepo;
import com.backend.Request.HistoryRequest;
import com.backend.Response.HistoryResponse;
import com.backend.entity.History;
import com.backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HistoryServiceImpl {

    private final HistoryRepo historyRepo;
    private final UserRepo userRepo;

    public List<HistoryResponse> getAllUserHistory(String sourceType , String clerkId) {
        User user = userRepo.findByClerkId(clerkId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return historyRepo.getAllHistoryByClerkId(user.getClerkId());
    }

    public List<HistoryResponse> getAllHistoryBySourceType(String sourceType , String clerkId) {
        User user = userRepo.findByClerkId(clerkId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return historyRepo.getAllHistoryBySourceType(sourceType, user.getClerkId());
    }

    public List<HistoryResponse> getAllHistoryByImageType(String imageType, String clerkId) {
        User user = userRepo.findByClerkId(clerkId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return historyRepo.getAllHistoryByImageType(imageType, user.getClerkId());
    }

    public String saveHistory(HistoryRequest request) {
        User user = userRepo.findByClerkId(request.getClerkId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        History history = History.builder()
                .image(request.getImage())
                .imageType(request.getImageType())
                .sourceType(request.getSourceType())
                .user(user)
                .clerkId(request.getClerkId())
                .build();


        historyRepo.save(history);

        return "User history saved";
    }
}

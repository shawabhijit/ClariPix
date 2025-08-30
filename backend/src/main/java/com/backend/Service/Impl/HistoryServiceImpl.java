package com.backend.Service.Impl;

import com.backend.Repository.HistoryRepo;
import com.backend.Repository.UserRepo;
import com.backend.Request.HistoryRequest;
import com.backend.Response.HistoryResponse;
import com.backend.entity.History;
import com.backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.hibernate.exception.DataException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HistoryServiceImpl {

    private final HistoryRepo historyRepo;
    private final UserRepo userRepo;

    public List<History> getAllUserHistory(String clerkId) {
        User user = userRepo.findByClerkId(clerkId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return historyRepo.getAllHistoryByClerkId(user.getClerkId());
    }

    public List<History> getAllHistoryBySourceType(String sourceType , String clerkId) {
        User user = userRepo.findByClerkId(clerkId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return historyRepo.getAllHistoryBySourceType(sourceType, user.getClerkId());
    }

    public List<History> getAllHistoryByImageType(String imageType, String clerkId) {
        User user = userRepo.findByClerkId(clerkId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return historyRepo.getAllHistoryByImageType(imageType, user.getClerkId());
    }

    public HistoryResponse saveHistory(HistoryRequest request , User user) throws Exception {

        History history = historyRepo.findHistoryByImage(request.getImage());

        if (history != null) {
            throw new Exception("Image is already present in the dataBase");
        }

        history = History.builder()
                .image(request.getImage())
                .imageType(request.getImageType())
                .sourceType(request.getSourceType())
                .user(user)
                .clerkId(request.getClerkId())
                .build();

        history = historyRepo.save(history);

        return HistoryResponse.builder()
                .image(history.getImage())
                .imageType(history.getImageType())
                .sourceType(history.getSourceType())
                .build();
    }

    public void deleteHistory(History history) {
        historyRepo.delete(history);
    }
}

package com.backend.Repository;

import com.backend.Response.HistoryResponse;
import com.backend.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoryRepo extends JpaRepository<History , Long> {

    List<HistoryResponse> getAllHistoryByClerkId(String clerkId);

    List<HistoryResponse> getAllHistoryBySourceType(String sourceType , String clerkId);

    List<HistoryResponse> getAllHistoryByImageType(String imageType, String clerkId);

    History saveUserHistory(History history);
}

package com.backend.Repository;

import com.backend.Response.HistoryResponse;
import com.backend.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepo extends JpaRepository<History , Long> {

    List<History> getAllHistoryByClerkId(String clerkId);

    @Query("SELECT h FROM History h WHERE h.sourceType = :sourceType AND h.clerkId = :clerkId")
    List<History> getAllHistoryBySourceType(@Param("sourceType") String sourceType,
                                            @Param("clerkId") String clerkId);


    @Query("SELECT h FROM History h WHERE h.imageType = :imageType AND h.clerkId = :clerkId")
    List<History> getAllHistoryByImageType(@Param("imageType") String imageType,
                                           @Param("clerkId") String clerkId);

    History findHistoryByImage (String image);

}

package com.backend.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HistoryRequest {
    private String image;
    private String imageType;
    private String sourceType;
    private String clerkId;
}

package com.backend.Response;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PicsartDataAIGenerateResponse {
    private String id;
    private String url;
    @Column(nullable = true)
    private String status;
}

package com.backend.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PicsartRequest {
    private String prompt;
    private int width;
    private int height;
    private int count;
}

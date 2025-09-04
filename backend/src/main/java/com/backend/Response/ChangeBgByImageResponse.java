package com.backend.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChangeBgByImageResponse {
    private String status;
    private DataResponse data;


    @Data
    static class DataResponse {
        private String id;
        private String url;
    }
}

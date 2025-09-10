package com.backend.Exceptions;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ErrorDetails {

    private String error;
    private String message;
    private LocalDateTime timestamp;

    public ErrorDetails(String error, String message, LocalDateTime timestamp) {
        super();
        this.error = error;
        this.message = message;
        this.timestamp = timestamp;
    }
}

package com.backend.Exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorDetails> userExceptionHandler (UserException e , WebRequest req) {
        ErrorDetails error = new ErrorDetails(e.getMessage() , req.getDescription(false) , LocalDateTime.now());
        return ResponseEntity.badRequest().body(error);
    }
}

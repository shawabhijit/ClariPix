package com.backend.Client;

import com.backend.Request.PicsartRequest;
import com.backend.Response.PicsartAiGeneratePostResponse;
import com.backend.Response.PicsartResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@FeignClient(name = "picsartClient" , url="https://genai-api.picsart.io/v1")
public interface PicsartClient {

    @PostMapping(
            value = "/text2image",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    PicsartAiGeneratePostResponse textToImage(
            @RequestHeader("X-Picsart-API-Key") String apiKey,
            @RequestBody PicsartRequest request
    );

    @GetMapping(value = "/text2image/inferences/{inference_id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    PicsartResponse getText2Image(
            @RequestHeader("X-Picsart-API-Key") String apiKey,
            @PathVariable String inference_id
    );



}

/*
// success
{
  "inference_id": "e57b4c91-987d-48d5-9d6d-e2aa40e6d2fb",
  "status": "ACCEPTED"
}
// fail
{
  "message": "Validation Failed",
  "detail": "Field prompt is required"
}
 */

package com.backend.Client;

import com.backend.Request.PicsartRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.io.File;
import java.util.List;

@FeignClient(name = "picsartClient" , url="https://genai-api.picsart.io/v1")
public interface PicsartClient {

    @PostMapping(
            value = "/text2image",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    List<String> textToImage(
            @RequestHeader("X-Picsart-API-Key") String apiKey,
            @RequestBody PicsartRequest request
    );

}

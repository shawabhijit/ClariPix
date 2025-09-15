package com.backend.Client;


import com.backend.Response.ChangeBgByImageResponse;
import com.backend.Response.PicsartResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "UpscalePicsartClient", url = "https://api.picsart.io")
public interface UpscalePicsartClient {

    @PostMapping(
            value = "/tools/1.0/upscale",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    ChangeBgByImageResponse upscaleImage(
            @RequestHeader("X-Picsart-API-Key") String apiKey,
            @RequestPart("image") MultipartFile image,
            @RequestPart("upscale_factor") String upscaleFactor,
            @RequestPart("format") String format
    );
}


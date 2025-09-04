package com.backend.Client;

import com.backend.Response.ChangeBgByImageResponse;
import com.backend.Response.PicsartResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@FeignClient(name = "changeBackground", url = "https://api.picsart.io")
public interface ChangeBackgroundClient {

    @PostMapping(value = "/tools/1.0/removebg", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ChangeBgByImageResponse changeBackground(
            @RequestHeader("X-Picsart-API-Key") String apiKey,
            @RequestPart("image") MultipartFile image,
            @RequestPart(value = "bg_image", required = false) MultipartFile bg_image,
            @RequestPart(value = "bg_image_url", required = false) String bg_image_url,

            @RequestPart(value = "output_type", required = false) String outputType,
            @RequestPart(value = "bg_blur", required = false) Integer bgBlur,
            @RequestPart(value = "scale", required = false) String scale,
            @RequestPart(value = "auto_center", required = false) Boolean autoCenter,
            @RequestPart(value = "format", required = false) String format
    );
}


package com.backend.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "clipDropClient" , url = "https://clipdrop-api.co")
public interface ClipDropClient {

    @PostMapping(value = "/remove-background/v1" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    byte[] removeBackground(@RequestPart("image_file") MultipartFile file ,
                            @RequestHeader("x-api-key") String apiKey);

    @PostMapping(value = "/replace-background/v1" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    byte[] replaceBackground(
            @RequestHeader("x-api-key") String apikey,
            @RequestPart("image_file") MultipartFile file,
            @RequestPart("prompt") String prompt
    );

    @PostMapping(value = "/image-upscaling/v1/upscale" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    byte[] imageUpscale(
            @RequestHeader("x-api-key") String apikey,
            @RequestPart("image_file") MultipartFile file,
            @RequestPart(name = "target_width" , value = "1460") Integer target_width,
            @RequestPart(name = "target_height" , value = "1280") Integer target_height
    );
}
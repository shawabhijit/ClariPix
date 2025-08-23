package com.backend.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "clipDropClient" , url = "https://clipdrop-api.co")
public interface ClipDropClient {

    @PostMapping(value = "/remove-background/v1" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    byte[] removeBackground(@RequestParam("image_file") MultipartFile file ,
                            @RequestHeader("x-api-key") String apiKey);


}

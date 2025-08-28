package com.backend.Service.Impl;

import com.backend.Client.PicsartClient;
import com.backend.Request.PicsartRequest;
import com.backend.Service.AiGenerateImageService;
import com.backend.Service.ImageEnhanceAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AiGenerateImageServiceImpl implements AiGenerateImageService {

    @Value("${picsart.api-key}")
    String picsartApiKey;

    private final PicsartClient picsartClient;

    @Override
    public List<String> generateTextToImage(PicsartRequest request) {
        return picsartClient.textToImage(picsartApiKey , request);
    }


    //6bfafdad-5d09-46c5-93f5-f6b65634f5eb
}
/*

{
  "status": "FINISHED",
  "data": [
    {
      "id": "740e03c2-66ff-48d2-a3c1-df6783199f05",
      "url": "https://aicdn.picsart.com/c3a101a9-b07a-4ec5-9c82-ac99b064f76f.jpg",
      "status": "DONE"
    },
    {
      "id": "3e6ab4ca-990c-4afe-98a7-08dc125fa99b",
      "url": "https://aicdn.picsart.com/525dc486-fb5c-4184-8a42-75f68b9fb78e.jpg",
      "status": "DONE"
    }
  ]
}
 */
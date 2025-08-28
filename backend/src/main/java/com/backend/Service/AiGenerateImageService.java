package com.backend.Service;

import com.backend.Request.PicsartRequest;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.File;
import java.util.List;

public interface AiGenerateImageService {

    List<String> generateTextToImage(PicsartRequest request);
}

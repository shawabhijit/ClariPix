package com.backend.Service;

import com.backend.Exceptions.UserException;
import com.backend.Request.PicsartRequest;
import com.backend.Response.PicsartAiGeneratePostResponse;
import com.backend.Response.PicsartDataAIGenerateResponse;
import com.backend.Response.PicsartResponse;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.File;
import java.util.List;

public interface AiGenerateImageService {

    PicsartAiGeneratePostResponse generateTextToImage(PicsartRequest request) throws UserException;

    PicsartResponse getGeneratedImages(String inference_id);
}

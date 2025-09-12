package com.backend.Service.Impl;

import com.backend.Client.PicsartClient;
import com.backend.DTO.UserDto;
import com.backend.Exceptions.UserException;
import com.backend.Request.PicsartRequest;
import com.backend.Response.PicsartAiGeneratePostResponse;
import com.backend.Response.PicsartDataAIGenerateResponse;
import com.backend.Response.PicsartResponse;
import com.backend.Service.AiGenerateImageService;
import com.backend.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiGenerateImageServiceImpl implements AiGenerateImageService {

    @Value("${picsart.api-key}")
    String picsartApiKey;

    private final PicsartClient picsartClient;
    private final UserService userService;

    @Override
    public PicsartAiGeneratePostResponse generateTextToImage(PicsartRequest request) throws UserException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getName() == null || authentication.getName().isEmpty()) {
            throw new UserException("You don't have permission to create image from the image. Please Login first.");
        }
        UserDto user = userService.getUserByClerkId(authentication.getName());
        // Validation : if exits and have credits
        if (user.getCredits() == 0) {
            throw new UserException("You don't have enough credits to remove text from the image.");
        }
        PicsartAiGeneratePostResponse res = picsartClient.textToImage(picsartApiKey , request);

        if (res != null) {
            user.setCredits(user.getCredits() - 3);
            userService.saveUser(user);
        }

        return res;
    }

    @Override
    public PicsartResponse getGeneratedImages(String inference_id) {
        return picsartClient.getText2Image(picsartApiKey , inference_id);
    }
}

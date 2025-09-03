package com.backend.Util;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.mock.web.MockMultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;

public class MultipartFileResizer {

    private static final int MAX_HEIGHT = 2048;

    public static MultipartFile resizeIfNeeded(MultipartFile file) throws IOException {
        BufferedImage originalImage = ImageIO.read(file.getInputStream());
        if (originalImage == null) {
            throw new IOException("Unsupported or corrupted image file");
        }

        int width = originalImage.getWidth();
        int height = originalImage.getHeight();

        BufferedImage outputImage;

        if (height > MAX_HEIGHT) {
            double scale = (double) MAX_HEIGHT / height;
            int newWidth = (int) (width * scale);

            outputImage = new BufferedImage(newWidth, MAX_HEIGHT, BufferedImage.TYPE_INT_ARGB);
            Graphics2D g = outputImage.createGraphics();
            g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
            g.drawImage(originalImage, 0, 0, newWidth, MAX_HEIGHT, null);
            g.dispose();
        } else {
            outputImage = originalImage;
        }

        // Always encode as PNG for safety
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(outputImage, "png", baos);

        return new MockMultipartFile(
                file.getName(),
                file.getOriginalFilename().replaceAll("\\.[^.]+$", "") + ".png",
                "image/png",
                new ByteArrayInputStream(baos.toByteArray())
        );
    }
}

package com.backend.Util;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.mock.web.MockMultipartFile;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Iterator;

public class MultipartFileResizer {

    public static class ImageDimensions {
        private final int width;
        private final int height;

        public ImageDimensions(int width, int height) {
            this.width = width;
            this.height = height;
        }

        public int getWidth() { return width; }
        public int getHeight() { return height; }

        @Override
        public String toString() {
            return width + "x" + height;
        }
    }

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

    public static ImageDimensions getImageDimensions(MultipartFile file) throws IOException {
        try (ByteArrayInputStream bis = new ByteArrayInputStream(file.getBytes())) {
            BufferedImage image = ImageIO.read(bis);
            if (image == null) {
                throw new IOException("Unable to read image file");
            }
            return new ImageDimensions(image.getWidth(), image.getHeight());
        }
    }

    /**
     * Get image dimensions without loading entire image (More memory efficient)
     */
    public static ImageDimensions getImageDimensionsEfficient(MultipartFile file) throws IOException {
        try (ImageInputStream iis = ImageIO.createImageInputStream(file.getInputStream())) {
            Iterator<ImageReader> readers = ImageIO.getImageReaders(iis);
            if (!readers.hasNext()) {
                throw new IOException("No suitable ImageReader found for the image");
            }

            ImageReader reader = readers.next();
            try {
                reader.setInput(iis);
                int width = reader.getWidth(0);
                int height = reader.getHeight(0);
                return new ImageDimensions(width, height);
            } finally {
                reader.dispose();
            }
        }
    }
}

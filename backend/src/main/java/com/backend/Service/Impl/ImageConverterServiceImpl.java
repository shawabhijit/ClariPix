package com.backend.Service.Impl;

import com.backend.Service.ImageConverterService;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImageConverterServiceImpl implements ImageConverterService {

    private static final String IMAGE_MAGICK_PATH = "C:/Program Files/ImageMagick-7.1.2-Q16-HDRI/";
    private static final String MAGICK_COMMAND = IMAGE_MAGICK_PATH + "magick.exe";

    @Override
    public byte[] convertFormat(byte[] inputImage, String format , String quality , String height , String width ) throws IOException, InterruptedException {

        File inputFile = null;
        File outputFile = null;

        try {
            // Validate input
            if (inputImage == null || inputImage.length == 0) {
                throw new IOException("Input image data is empty");
            }

            System.out.println("provided height and width" + height +"  "+ width);

            // Create temporary input file with proper extension
            inputFile = File.createTempFile("input_", ".tmp");
            try (FileOutputStream fos = new FileOutputStream(inputFile)) {
                fos.write(inputImage);
            }

            // Create output file with requested extension
            outputFile = File.createTempFile("output_", "." + format.toLowerCase());

            // Delete output file if it exists to ensure clean conversion
            if (outputFile.exists()) {
                outputFile.delete();
            }

            System.out.println("Converting: " + inputFile.getAbsolutePath() + " -> " + outputFile.getAbsolutePath());
            System.out.println("Input file size: " + inputFile.length() + " bytes");

            // Build command arguments for ImageMagick 7.x
            List<String> command = new ArrayList<>();
            command.add(MAGICK_COMMAND);
            command.add("convert"); // Use convert subcommand explicitly
            command.add(inputFile.getAbsolutePath());

            // Add conversion options
            command.add("-strip"); // Remove all metadata including XMP
            command.add("-colorspace");
            command.add("sRGB");

            // Add resize functionality if width and height are provided
            if (width != null && height != null && Integer.parseInt(width) > 0 && Integer.parseInt(height) > 0) {
                command.add("-resize");
                command.add(width + "x" + height + "^");  // Note the caret
                command.add("-gravity");
                command.add("center");
                command.add("-crop");
                command.add(width + "x" + height + "+0+0");
                System.out.println("Resizing to: " + width + "x" + height);
            }

            // Set quality based on format
            if ("webp".equalsIgnoreCase(format)) {
                String webpQuality = (quality != null && Integer.parseInt(quality) >= 1 && Integer.parseInt(quality) <= 100) ? quality : "90";
                command.add("-quality");
                command.add(webpQuality);
            }
            else {
                command.add("-quality");
                command.add("95");
            }

            // Add output file
            command.add(outputFile.getAbsolutePath());

            System.out.println("Executing command: " + String.join(" ", command));

            // Execute the conversion using ProcessBuilder
            ProcessBuilder processBuilder = new ProcessBuilder(command);
            processBuilder.redirectErrorStream(false); // Keep error stream separate

            Process process = processBuilder.start();

            // Wait for the process to complete
            int exitCode = process.waitFor();

            if (exitCode != 0) {
                throw new IOException("ImageMagick conversion failed with exit code " + exitCode);
            }

            // Check if output file was created and has content
            if (!outputFile.exists()) {
                throw new IOException("ImageMagick conversion failed - output file was not created");
            }
            if (outputFile.length() == 0) {
                throw new IOException("ImageMagick conversion failed - output file is empty");
            }

            // Read converted file into byte array
            byte[] result = Files.readAllBytes(outputFile.toPath());

            if (result.length > 0) {
                String resultStart = new String(result, 0, Math.min(100, result.length));
                if (resultStart.contains("<?xpacket") || resultStart.contains("xmp:")) {
                    throw new IOException("Conversion returned metadata instead of image data. " +
                            "This might indicate an issue with the conversion process.");
                }
            }

            return result;

        } finally {
            // Cleanup temporary files
            if (inputFile != null && inputFile.exists()) {
                boolean deleted = inputFile.delete();
                if (!deleted) {
                    System.err.println("Failed to delete input temp file: " + inputFile.getAbsolutePath());
                }
            }
            if (outputFile != null && outputFile.exists()) {
                boolean deleted = outputFile.delete();
                if (!deleted) {
                    System.err.println("Failed to delete output temp file: " + outputFile.getAbsolutePath());
                }
            }
        }
    }
}
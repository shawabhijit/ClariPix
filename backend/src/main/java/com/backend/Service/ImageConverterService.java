package com.backend.Service;

import org.im4java.core.IM4JavaException;

import java.io.IOException;

public interface ImageConverterService {

    public byte[] convertFormat (byte[] inputImage , String format) throws IOException, InterruptedException, IM4JavaException;
}

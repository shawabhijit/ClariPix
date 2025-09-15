package com.backend.Service;

import org.im4java.core.IM4JavaException;

import java.io.IOException;

public interface ImageConverterService {

    public byte[] convertFormat (byte[] inputImage , String format , String quality , String height , String width) throws IOException, InterruptedException, IM4JavaException;
}

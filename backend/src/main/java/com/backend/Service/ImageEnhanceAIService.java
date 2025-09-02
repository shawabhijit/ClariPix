package com.backend.Service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageEnhanceAIService {

    byte[] removeBackground(MultipartFile file);
    byte[] replaceBackgroundWithPrompt(MultipartFile file , String prompt);
}
/*


OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("multipart/form-data; boundary=---011000010111000001101001");
RequestBody body = RequestBody.create(mediaType, "-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"output_type\"\r\n\r\ncutout\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"bg_blur\"\r\n\r\n0\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"scale\"\r\n\r\nfit\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"auto_center\"\r\n\r\nfalse\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"stroke_size\"\r\n\r\n0\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"stroke_color\"\r\n\r\nFFFFFF\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"stroke_opacity\"\r\n\r\n100\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"shadow\"\r\n\r\ndisabled\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"shadow_opacity\"\r\n\r\n20\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"shadow_blur\"\r\n\r\n50\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"format\"\r\n\r\nPNG\r\n-----011000010111000001101001--");
Request request = new Request.Builder()
  .url("https://api.picsart.io/tools/1.0/removebg")
  .post(body)
  .addHeader("accept", "application/json")
  .addHeader("content-type", "multipart/form-data; boundary=---011000010111000001101001")
  .build();

Response response = client.newCall(request).execute();


 */
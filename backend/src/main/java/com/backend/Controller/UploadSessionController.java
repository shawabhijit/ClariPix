package com.backend.Controller;

import com.backend.Repository.UploadSessionRepo;
import com.backend.entity.UploadSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@RestController
@RequestMapping("/api/session")
@RequiredArgsConstructor
public class UploadSessionController {

    private final UploadSessionRepo repo;

    @PostMapping("/create")
    public ResponseEntity<UploadSession> createSession() {
        String id = UUID.randomUUID().toString();
        UploadSession session = new UploadSession();
        session.setId(id);
        session.setUploaded(false);
        repo.save(session);
        return ResponseEntity.ok(session);
    }

    @PostMapping("/{id}/upload")
    public ResponseEntity<String> uploadFile(@PathVariable String id,
                                             @RequestParam("file") MultipartFile file) throws IOException {
        Path path = Paths.get("uploads/" + id + "_" + file.getOriginalFilename());
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        UploadSession session = repo.findById(id).orElseThrow();
        session.setImageUrl("/uploads/" + path.getFileName());
        session.setUploaded(true);
        repo.save(session);

        return ResponseEntity.ok("Uploaded");
    }

    @GetMapping("/{id}")
    public ResponseEntity<UploadSession> getSession(@PathVariable String id) {
        return ResponseEntity.of(repo.findById(id));
    }
}

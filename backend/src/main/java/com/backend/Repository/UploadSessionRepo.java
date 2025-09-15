package com.backend.Repository;

import com.backend.entity.UploadSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UploadSessionRepo extends JpaRepository<UploadSession , String> {
}

package com.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tbl_users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String clerkId;
    @Column(unique = true, nullable = false)
    private String email;
    private String firstName;
    private String lastName;
    private Integer credits;
    private String photoUrl;

    @PrePersist
    public void prePersist() {
        if (credits == null) {
            credits = 5;
        }
    }
}

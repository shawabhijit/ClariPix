package com.backend.entity;

import jakarta.persistence.*;
import lombok.*;




@Entity
@Table(name = "tbl_users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;   // <- Primary key in DB

    @Column(unique = true, nullable = false)
    private String clerkId; // external id from Clerk

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



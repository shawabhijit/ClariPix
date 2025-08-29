package com.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "history")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String image;
    private String imageType;
    private String sourceType;

    // store clerkId for direct lookup
    @Column(nullable = false)
    private String clerkId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude
    private User user;
}





// https://aicdn.picsart.com/0f268738-930c-485e-82eb-3bae6c58bdde.jpg
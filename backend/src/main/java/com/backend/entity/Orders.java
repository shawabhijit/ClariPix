package com.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;


@Entity
@Table(name = "tbl_orders")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String orderId;
    private String clerkId;
    private String plan;
    private Double amount;
    private Integer credits;
    private Boolean payment;

    @CreationTimestamp
    @Column(nullable = false , updatable = false)
    private Timestamp createdAt;

    @PrePersist
    public void prePersist() {
        if (payment == null) {
            payment = false;
        }
    }
}

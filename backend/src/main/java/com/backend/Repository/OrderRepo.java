package com.backend.Repository;

import com.backend.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepo extends JpaRepository<Orders , Long> {
    Optional<Orders> findByOrderId(String orderId);

    Orders findByClerkId(String clerkId);
}

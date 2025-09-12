package com.backend.Controller;


import com.backend.DTO.RazorpayOrderDto;
import com.backend.Exceptions.UserException;
import com.backend.Service.OrderService;
import com.backend.Service.RazorpayService;
import com.razorpay.Order;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final RazorpayService razorpayService;

    @PostMapping
    public ResponseEntity<RazorpayOrderDto> createOrder (@RequestParam String planId) throws RazorpayException, UserException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth.getName().isEmpty() || auth.getName() == null) {
            throw new UserException("User not found. Please Login first.");
        }
        Order order = orderService.createOrder(planId, auth.getName());
        RazorpayOrderDto responseDto = convertTORazorpayDto(order);

        return ResponseEntity.ok().body(responseDto);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyOrder (Map<String , Object> request) throws RazorpayException {
        String razorpayOrderId = request.get("razorpayOrderId").toString();
        return ResponseEntity.ok(razorpayService.verifyPayment(razorpayOrderId));
    }

    public RazorpayOrderDto convertTORazorpayDto (Order order) {
        return RazorpayOrderDto.builder()
                .id(order.get("id"))
                .entity(order.get("entity"))
                .amount(order.get("amount"))
                .currency(order.get("currency"))
                .status(order.get("status"))
                .created_at(order.get("created_at"))
                .receipt(order.get("receipt"))
                .build();
    }
}

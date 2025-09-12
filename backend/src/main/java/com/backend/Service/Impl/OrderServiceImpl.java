package com.backend.Service.Impl;

import com.backend.Repository.OrderRepo;
import com.backend.Service.OrderService;
import com.backend.Service.RazorpayService;
import com.backend.Service.UserService;
import com.backend.entity.Orders;
import com.razorpay.Order;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepo orderRepo;
    private final RazorpayService razorpayService;

    private static final Map<String , PlaneDetails> PLANE_DETAILS = Map.of(
      "Basic" , new PlaneDetails("Basic" , 100 , 499.00),
      "Premium" , new PlaneDetails("Premium" , 500 , 899.00),
      "Ultimate" , new PlaneDetails("Ultimate" , 10000 , 1499.00)
    );

    private record PlaneDetails (String name , int credits , double amount){

    }

    @Override
    public Order createOrder(String planId, String clerkId) throws RazorpayException {
        PlaneDetails details = PLANE_DETAILS.get(planId);
        if (details == null) {
            throw new IllegalArgumentException("Plane does not exist with id: " + planId);
        }
        try {
            Order razorpayOrder = razorpayService.createOrder(details.amount() , "INR");

            Orders orders = Orders.builder()
                    .clerkId(clerkId)
                    .plan(details.name())
                    .credits(details.credits())
                    .amount(details.amount())
                    .orderId(razorpayOrder.get("id"))
                    .build();
            orderRepo.save(orders);
            return razorpayOrder;
        }
        catch (Exception e) {
            e.printStackTrace();
            throw new RazorpayException("Error while creating the order :"+e.getMessage());
        }
    }
}

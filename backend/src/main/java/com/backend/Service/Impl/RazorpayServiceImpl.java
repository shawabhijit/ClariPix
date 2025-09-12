package com.backend.Service.Impl;

import com.backend.DTO.UserDto;
import com.backend.Repository.OrderRepo;
import com.backend.Service.RazorpayService;
import com.backend.Service.UserService;
import com.backend.entity.Orders;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RazorpayServiceImpl implements RazorpayService {

    @Value("${razorpay.api.key}")
    private String razorpayKeyId;
    @Value("${razorpay.api.secret}")
    private String razorpaySecretKey;

    private final OrderRepo orderRepo;
    private final UserService userService;

    @Override
    public Order createOrder(Double amount, String currency) throws RazorpayException {
        try {
            RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpaySecretKey);
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount*100);
            orderRequest.put("currency", currency);
            orderRequest.put("receipt" , "order_rcptid" + System.currentTimeMillis());
            orderRequest.put("payment_capture" , 1);

            return razorpayClient.orders.create(orderRequest);
        }
        catch (Exception e) {
            throw new RazorpayException("Razorpay error : "+e.getMessage());
        }
    }

    @Override
    public Map<String, Object> verifyPayment(String razorpayOrderId) throws RazorpayException {
        Map<String, Object> response = new HashMap<>();

        try {
            RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpaySecretKey);
            Order orderInfo = client.orders.fetch(razorpayOrderId);
            if (orderInfo.get("status").toString().equalsIgnoreCase("paid")) {
                Orders existingOrder = orderRepo.findByOrderId(razorpayOrderId)
                        .orElseThrow(() -> new RazorpayException("Order not found : "+razorpayOrderId));

                if (existingOrder.getPayment()) {
                    response.put("success" , false);
                    response.put("message" , "Payment Failed.");
                    return response;
                }

                UserDto userDto = userService.getUserByClerkId(existingOrder.getClerkId());
                userDto.setCredits(existingOrder.getCredits() + userDto.getCredits());

                userService.saveUser(userDto);
                existingOrder.setPayment(true);
                orderRepo.save(existingOrder);
                response.put("success" , true);
                response.put("message" , "Nitro's Added.");
                return response;
            }
        }
        catch (RazorpayException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR , e.getMessage());
        }
        return response;
    }
}


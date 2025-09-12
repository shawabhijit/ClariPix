package com.backend.Service.Impl;

import com.backend.DTO.UserDto;
import com.backend.Exceptions.UserException;
import com.backend.Repository.UserRepo;
import com.backend.Response.RemoveBgResponse;
import com.backend.Service.UserService;
import com.backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;

    @Override
    public UserDto saveUser(UserDto userDto) {
        Optional<User> optionalUser = userRepo.findByClerkId(userDto.getClerkId());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setClerkId(userDto.getClerkId());
            user.setEmail(userDto.getEmail());
            user.setFirstName(userDto.getFirstName());
            user.setLastName(userDto.getLastName());
            user.setPhotoUrl(userDto.getPhotoUrl());
            if (userDto.getCredits() != null) {
                user.setCredits(userDto.getCredits());
            }
            user = userRepo.save(user);
            return mapToDto(user);
        }
        User newUser = mapToUser(userDto);
        userRepo.save(newUser);
        return mapToDto(newUser);
    }

    @Override
    public UserDto getUserByClerkId(String clerkId) {
        User user = userRepo.findByClerkId(clerkId).orElseThrow(() -> new UsernameNotFoundException("user not found"));
        return mapToDto(user);
    }

    @Override
    public void deleteUserByClerkId(String clerkId) {
        User user = userRepo.findByClerkId(clerkId).orElseThrow(() -> new UsernameNotFoundException("user not found"));
        userRepo.delete(user);
    }

    @Override
    public UserDto AuthenticateUser() throws UserException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth.getName().isEmpty() || auth.getName() == null) {
            throw new UserException("User not found. Please Login first.");
        }
        UserDto user = getUserByClerkId(auth.getName());
        // Validation : if exits and have credits
        if (user.getCredits() == 0) {
            throw new UserException("You don't have enough credits. Buy Subscription plan");
        }
        return user;
    }

    private UserDto mapToDto(User user) {
        return UserDto.builder()
                .clerkId(user.getClerkId())
                .credits(user.getCredits())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }

    private User mapToUser(UserDto userDto) {
        return User.builder()
                .clerkId(userDto.getClerkId())
                .email(userDto.getEmail())
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .credits(userDto.getCredits())
                .build();
    }
}

package com.backend.Service.Impl;

import com.backend.DTO.UserDto;
import com.backend.Repository.UserRepo;
import com.backend.Service.UserService;
import com.backend.entity.User;
import lombok.RequiredArgsConstructor;
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

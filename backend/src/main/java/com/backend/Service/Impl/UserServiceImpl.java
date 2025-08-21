package com.backend.Service.Impl;

import com.backend.Model.UserDto;
import com.backend.Repository.UserRepo;
import com.backend.Service.UserService;
import com.backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;

    @Override
    public UserDto saveUser(UserDto user) {
        return null;
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

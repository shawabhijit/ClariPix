package com.backend.Service;

import com.backend.DTO.UserDto;

public interface UserService {

    public UserDto saveUser(UserDto user);

    UserDto getUserByClerkId(String clerkId);

    void deleteUserByClerkId(String clerkId);
}

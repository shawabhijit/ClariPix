package com.backend.Service;

import com.backend.DTO.UserDto;
import com.backend.Exceptions.UserException;

public interface UserService {

    public UserDto saveUser(UserDto user);

    UserDto getUserByClerkId(String clerkId);

    void deleteUserByClerkId(String clerkId);

    UserDto AuthenticateUser() throws UserException;
}

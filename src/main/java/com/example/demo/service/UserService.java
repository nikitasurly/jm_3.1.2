package com.example.demo.service;

import com.example.demo.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface UserService {
    void add(User user);
    void delete(Long id);
    List<User> listUsers();
    User find(Long id);
    User getUserByEmail();
}

package com.example.demo.service;

import com.example.demo.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    User saveOrUpdate(User user);
    void delete(Long id);
    List<User> listUsers();
    User find(Long id);
    User getUserByCurrentEmail();
}

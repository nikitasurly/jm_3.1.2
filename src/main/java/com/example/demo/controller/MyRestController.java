package com.example.demo.controller;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.service.RoleService;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MyRestController {

    private final UserService userService;

    private final RoleService roleService;

    @GetMapping("/currentUser")
    public User authoredUser() {
        return userService.getUserByCurrentEmail();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") Long id) {
        return userService.find(id);
    }


    @GetMapping("/users")
    public List<User> allUsers() {
        return userService.listUsers();
    }

    @GetMapping("/roles")
    public List<Role> allRoles() {
        return roleService.getListRoles();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public User saveOrUpdateUser(@RequestBody User user) {
        return userService.saveOrUpdate(user);
    }

    @DeleteMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long id) {
        userService.delete(id);
        return new ResponseEntity<String>(HttpStatus.OK);
    }


}

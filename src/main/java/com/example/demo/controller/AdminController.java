package com.example.demo.controller;


import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.service.RoleService;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;


import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;

    private final RoleService roleService;

    @GetMapping("/users")
    public String listUsers(ModelMap model) {
        model.addAttribute("users", userService.listUsers());
        return "all_users";
    }

    @GetMapping("/users/new")
    public String newUser(ModelMap model) {
        model.addAttribute("user", new User());
        model.addAttribute("allRoles", roleService.getListRoles());
        return "add";
    }

    @PostMapping("/users")
    public String add(@ModelAttribute("user") User user,
                      @RequestParam(value = "role", required = false)
                              String[] roleFromForm) {

        return getString(user, roleFromForm);
    }

    @GetMapping("/edit/{id}")
    public String setUser(@PathVariable("id") Long id,
                                ModelMap model) {
        model.addAttribute("user", userService.find(id));
        model.addAttribute("allRoles", roleService.getListRoles());
        return "edit";
    }

    @PostMapping("/edit")
    public String set(@ModelAttribute("user") User user,
                      @RequestParam(value = "role", required = false)
                              String[] roleFromForm) {

        return getString(user, roleFromForm);
    }

    private String getString(@ModelAttribute("user") User user, @RequestParam(value = "role", required = false) String[] roleFromForm) {
        Set<Role> roles = new HashSet<>();
        if (Objects.nonNull(roleFromForm)) {
            for (String role : roleFromForm) {
                roles.add(roleService.getRoleByName(role));
            }
        }
        user.setRoles(roles);
        userService.add(user);
        return "redirect:/admin/users";
    }

    @PostMapping("/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.delete(id);
        return "redirect:/admin/users";
    }

}

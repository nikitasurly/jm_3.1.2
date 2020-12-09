package com.example.demo.service;


import com.example.demo.model.Role;

import java.util.List;

public interface RoleService {
    List<Role> getListRoles();
    Role getRoleByName(String name);
}

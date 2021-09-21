package web.service;

import web.models.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAllRoles();
    Role getRoleById(long id);
    Role getRoleByName(String name);
    void saveRole(Role role);
}

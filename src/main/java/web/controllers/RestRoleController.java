package web.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import web.models.Role;
import web.service.RoleService;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/roles")
public class RestRoleController {
    private final RoleService roleService;
    
    @GetMapping
    public List<Role> getAll() {
        return roleService.getAllRoles();
    }
}

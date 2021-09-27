package web.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import web.models.Role;
import web.models.User;
import web.service.RoleService;
import web.service.UserService;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class RestUserController {
    private final UserService userService;
    private final RoleService roleService;
    
    @GetMapping
    public List<User> getAll() {
        return userService.getAllUsers();
    }
    
    @GetMapping("{id}")
    public User showInfo(@PathVariable("id") long id) {
        return userService.getUserById(id);
    }
    
    @PostMapping
    public User create(@RequestBody User user) {
        userService.saveUser(user);
        return user;
    }
    
    @PatchMapping("{id}")
    public User update(@RequestBody User user) {
        userService.updateUser(user);
        return user;
    }
    
    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") long id) {
        userService.deleteUserById(id);
    }
    
    @GetMapping("roles")
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }
}

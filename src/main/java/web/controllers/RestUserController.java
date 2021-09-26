package web.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import web.models.User;
import web.service.UserService;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class RestUserController {
    private final UserService userService;
    
    @GetMapping
    public List<User> getAll() {
        return userService.getAllUsers();
    }
    
    @GetMapping("/{id}")
    public User showInfo(@PathVariable("id") long id) {
        User user = userService.getUserById(id);
        System.out.println(user);
        return user;
    }
    
    @PostMapping
    public User create(@RequestBody User user) {
        userService.saveUser(user);
        return user;
    }
    
    @PatchMapping("{id}")
    public User update(@ModelAttribute("user") User user) {
        userService.updateUser(user);
        return user;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") long id) {
        userService.deleteUserById(id);
    }
}

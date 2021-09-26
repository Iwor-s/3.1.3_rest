package web.controllers;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import web.models.User;
import web.service.UserService;

@AllArgsConstructor
@Controller
@RequestMapping("/admin/users")
public class AdminController {
    private final UserService userService;
    
    @PostMapping
    public String create(@ModelAttribute("new_user") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }
    
    @PatchMapping("{id}")
    public String update(@ModelAttribute("user") User user) {
        userService.updateUser(user);
        return "redirect:/admin";
    }
    
    @DeleteMapping("{id}")
    public String delete(@PathVariable("id") long id) {
        userService.deleteUserById(id);
        return "redirect:/admin";
    }
    
    // @GetMapping("new")
    // public String newUser(Model model, @ModelAttribute("user") User user) {
    //     model.addAttribute("allRoles", roleService.getAllRoles());
    //     return "admin";
    // }
    
    // @GetMapping("{id}/edit")
    // public String showInfo(Model model, @PathVariable("id") long id) {
    //     model.addAttribute("user", userService.getUserById(id));
    //     return "admin/user";
    // }
}

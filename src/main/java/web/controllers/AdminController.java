package web.controllers;

import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import web.models.User;
import web.service.RoleService;
import web.service.UserService;

@AllArgsConstructor
@Controller
@RequestMapping("/admin")
public class AdminController {
    private final RoleService roleService;
    private final UserService userService;
    
    @GetMapping
    public String showAll(@AuthenticationPrincipal User principal, Model model) {
        model.addAttribute("princ", principal);
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("allRoles", roleService.getAllRoles());
        model.addAttribute("new_user", new User());
        return "admin";
    }
    
    @PostMapping
    public String create(@ModelAttribute("new_user") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }
    
    @PatchMapping("edit")
    public String update(@ModelAttribute("user") User user) {
        System.out.println();
        System.out.println(user);
        System.out.println();
        userService.updateUser(user);
        return "redirect:/admin";
    }
    
    @DeleteMapping("{id}")
    public String delete(@PathVariable("id") long id) {
        userService.deleteUserById(id);
        return "redirect:/admin";
    }
}

package web.controllers;

import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import web.models.User;
import web.service.RoleService;
import web.service.UserService;

@AllArgsConstructor
@Controller
public class MainController {
    UserService userService;
    RoleService roleService;
    
    @GetMapping("login")
    public String loginPage(@AuthenticationPrincipal User principal) {
        if (principal != null) {
            return principal.getRoles().toString().contains("ADMIN")
                    ? "redirect:/admin"
                    : "redirect:/user";
        }
        return "login";
    }
    
    @GetMapping("admin")
    public String showAll(@AuthenticationPrincipal User principal, Model model) {
        model.addAttribute("princ", principal);
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("allRoles", roleService.getAllRoles());
        model.addAttribute("new_user", new User());
        return "admin";
    }
    
    @GetMapping("user")
    public String userPage(@AuthenticationPrincipal User principal, Model model) {
        model.addAttribute("princ", principal);
        return "user";
    }
}

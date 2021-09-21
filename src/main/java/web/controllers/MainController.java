package web.controllers;

import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import web.models.User;
import web.service.UserService;

@AllArgsConstructor
@Controller
public class MainController {
    UserService userService;
    
    @GetMapping("login")
    public String loginPage(@AuthenticationPrincipal User principal) {
        if(principal != null) {
            return principal.getRoles().toString().contains("ADMIN")
                    ? "redirect:/admin"
                    : "redirect:/user";
        }
        return "login";
    }
    
    @GetMapping("user")
    public String userPage(@AuthenticationPrincipal User principal, Model model) {
        model.addAttribute("princ", principal);
        return "admin";
    }
}

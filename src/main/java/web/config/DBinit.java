package web.config;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import web.models.Role;
import web.models.User;
import web.service.RoleService;
import web.service.UserService;
import javax.annotation.PostConstruct;

@AllArgsConstructor
@Component
public class DBinit {
    private final RoleService roleService;
    private final UserService userService;
    
    @PostConstruct
    public void createData() {
        Role role1 = new Role("ADMIN");
        Role role2 = new Role("USER");
        roleService.saveRole(role1);
        roleService.saveRole(role2);
        
        User user1 = new User();
        user1.setFirstName("Tom");
        user1.setLastName("Jones");
        user1.setAge((byte) 27);
        user1.setEmail("tom@gmail.com");
        user1.setPassword("tom");
        user1.addRole(role1);
        
        User user2 = new User();
        user2.setFirstName("Анна");
        user2.setLastName("Волкова");
        user2.setAge((byte) 24);
        user2.setEmail("ann@mail.ru");
        user2.setPassword("анна");
        user2.addRole(role2);
        
        User user3 = new User();
        user3.setFirstName("Sam");
        user3.setLastName("Black");
        user3.setAge((byte) 35);
        user3.setEmail("sam@yahoo.com");
        user3.setPassword("sam");
        user3.addRole(role1, role2);
        
        userService.saveUser(user1);
        userService.saveUser(user2);
        userService.saveUser(user3);
    }
}

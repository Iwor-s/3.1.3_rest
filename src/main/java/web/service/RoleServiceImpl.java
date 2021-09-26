package web.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import web.models.Role;
import web.repository.RoleRepository;

import java.util.List;

@AllArgsConstructor
@Service
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    
    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
    
    @Override
    public void saveRole(Role role) {
        roleRepository.save(role);
    }
}

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
    public Role getRoleById(long id) {
        return roleRepository.getRoleById(id);
    }
    
    @Override
    public Role getRoleByName(String name) {
        return roleRepository.findRoleByName(name);
    }
    
    @Override
    public void saveRole(Role role) {
        roleRepository.save(role);
    }
}

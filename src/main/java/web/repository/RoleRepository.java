package web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}

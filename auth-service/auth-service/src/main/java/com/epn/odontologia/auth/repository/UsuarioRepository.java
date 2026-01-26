package com.epn.odontologia.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.epn.odontologia.auth.models.Usuario;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
}
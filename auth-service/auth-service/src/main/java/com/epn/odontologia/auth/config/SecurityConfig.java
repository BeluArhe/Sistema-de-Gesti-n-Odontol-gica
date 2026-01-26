package com.epn.odontologia.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Encripta las contraseñas antes de guardarlas en db_usuarios
        return new BCryptPasswordEncoder(); 
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) 
            .authorizeHttpRequests(auth -> auth
                // Permite registrar usuarios sin estar logueado
                .requestMatchers("/api/auth/registrar").permitAll() 
                // Cualquier otra ruta pide usuario y contraseña
                .anyRequest().authenticated() 
            )
            // Habilita el login "normal" (Ventana de usuario/clave)
            .httpBasic(withDefaults()); 
            
        return http.build();
    }
}
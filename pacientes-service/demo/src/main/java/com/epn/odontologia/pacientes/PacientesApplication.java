package com.epn.odontologia.pacientes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication; // <--- FALTABA ESTO

@SpringBootApplication
public class PacientesApplication {
    public static void main(String[] args) {
        System.setProperty("server.port", "8081");
        System.setProperty("spring.datasource.url", "jdbc:postgresql://localhost:5432/db_pacientes");
        System.setProperty("spring.datasource.username", "postgres");
        System.setProperty("spring.datasource.password", "admin");
        
        SpringApplication.run(PacientesApplication.class, args);
    }
}
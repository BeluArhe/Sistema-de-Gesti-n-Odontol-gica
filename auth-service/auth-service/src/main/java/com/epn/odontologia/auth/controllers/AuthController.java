package com.epn.odontologia.auth.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.epn.odontologia.auth.models.Usuario;
import com.epn.odontologia.auth.services.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService aServ;

    @PostMapping("/registrar")
    public Usuario registrar(@RequestBody Usuario usuario) {
        return aServ.registrar(usuario);
    }
    
    // El método de login lo maneja Spring Security automáticamente 
    // en la ruta /login por defecto.
}
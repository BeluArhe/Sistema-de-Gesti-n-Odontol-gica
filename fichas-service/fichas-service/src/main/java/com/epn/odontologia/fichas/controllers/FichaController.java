package com.epn.odontologia.fichas.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*; // Importa todas las anotaciones necesarias
import com.epn.odontologia.fichas.models.FichaEndodoncia;
import com.epn.odontologia.fichas.services.FichaService;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/fichas")
public class FichaController {

    @Autowired
    private FichaService fServ;

    // Método para guardar la ficha (incluye diagnóstico, dolor, etc. por cascada)
    @PostMapping("/crear")
    public FichaEndodoncia crear(@RequestBody FichaEndodoncia ficha) {
        return fServ.crearFicha(ficha);
    }

    // NUEVO: Método para obtener todas las fichas de un paciente específico
    // Esto es lo que usaremos para mostrar el historial en el frontend
    @GetMapping("/paciente/{pacienteId}")
    public List<FichaEndodoncia> listarPorPaciente(@PathVariable Long pacienteId) {
        return fServ.obtenerPorPaciente(pacienteId);
    }
}
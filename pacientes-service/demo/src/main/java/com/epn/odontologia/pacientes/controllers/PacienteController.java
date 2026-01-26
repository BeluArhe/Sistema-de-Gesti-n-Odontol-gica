package com.epn.odontologia.pacientes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.epn.odontologia.pacientes.models.Paciente;
import com.epn.odontologia.pacientes.services.PacienteService;
import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin(origins = "http://localhost:3000")
public class PacienteController {

    @Autowired
    private PacienteService pServ;

    @PostMapping("/create")
    public Paciente create(@RequestBody Paciente p) {
        return pServ.savePatient(p);
    }

    @GetMapping("/all")
    public List<Paciente> getAll() {
        return pServ.getAllPatients();
    }

    @GetMapping("/{id}")
    public Paciente getById(@PathVariable Long id) {
        return pServ.getPatientById(id);
    }
}
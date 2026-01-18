package com.epn.odontologia.pacientes.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.epn.odontologia.pacientes.models.Paciente;
import com.epn.odontologia.pacientes.repository.PacienteRepository;
import java.util.List;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pRepo;

    public Paciente savePatient(Paciente p) {
        return pRepo.save(p);
    }

    public List<Paciente> getAllPatients() {
        return pRepo.findAll();
    }

    public Paciente getPatientById(Long id) {
        return pRepo.findById(id).orElse(null);
    }

    public void deletePatient(Long id) {
        pRepo.deleteById(id);
    }
}
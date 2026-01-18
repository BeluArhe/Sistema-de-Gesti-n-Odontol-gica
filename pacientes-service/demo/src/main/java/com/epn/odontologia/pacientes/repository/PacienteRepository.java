package com.epn.odontologia.pacientes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.epn.odontologia.pacientes.models.Paciente;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    // Aquí puedes agregar búsquedas personalizadas si las necesitas más adelante
    Paciente findByCedula(String cedula);
}
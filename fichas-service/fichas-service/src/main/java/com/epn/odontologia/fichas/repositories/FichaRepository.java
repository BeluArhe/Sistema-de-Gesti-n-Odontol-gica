package com.epn.odontologia.fichas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.epn.odontologia.fichas.models.FichaEndodoncia;

@Repository
public interface FichaRepository extends JpaRepository<FichaEndodoncia, Long> {
    // Permite buscar todas las fichas de un paciente específico
    java.util.List<FichaEndodoncia> findByPacienteId(Long pacienteId);
}
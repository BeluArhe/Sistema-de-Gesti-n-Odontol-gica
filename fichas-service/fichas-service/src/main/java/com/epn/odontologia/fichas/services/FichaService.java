package com.epn.odontologia.fichas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.epn.odontologia.fichas.models.FichaEndodoncia;
import com.epn.odontologia.fichas.repositories.FichaRepository;
import java.util.List;

@Service
public class FichaService {

    @Autowired
    private FichaRepository fRepo;

    /**
     * Guarda la ficha completa. 
     * Gracias al CascadeType.ALL en la entidad, esto guardará 
     * automáticamente el diagnóstico, dolor, examen físico y pagos.
     */
    public FichaEndodoncia crearFicha(FichaEndodoncia ficha) {
        // En una arquitectura real, aquí podrías validar con el 
        // microservicio de pacientes si el pacienteId existe.
        return fRepo.save(ficha);
    }

    /**
     * Busca todas las fichas clínicas de un paciente.
     * Es fundamental para el historial clínico del sistema odontológico.
     */
    public List<FichaEndodoncia> obtenerPorPaciente(Long pacienteId) {
        return fRepo.findByPacienteId(pacienteId);
    }

    /**
     * Obtiene una ficha específica por su ID.
     */
    public FichaEndodoncia obtenerPorId(Long id) {
        return fRepo.findById(id).orElse(null);
    }
}
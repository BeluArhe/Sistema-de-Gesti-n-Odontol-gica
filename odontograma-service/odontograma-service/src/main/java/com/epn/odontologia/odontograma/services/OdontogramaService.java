package com.epn.odontologia.odontograma.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.epn.odontologia.odontograma.models.Odontograma;
import com.epn.odontologia.odontograma.models.Diente;
import com.epn.odontologia.odontograma.repositories.OdontogramaRepository;
import com.epn.odontologia.odontograma.repositories.DienteRepository;
import java.util.List;
import java.util.Date;

@Service
public class OdontogramaService {

    @Autowired
    private OdontogramaRepository odontogramaRepo;
    
    @Autowired
    private DienteRepository dienteRepo;

    /**
     * Crea un nuevo odontograma para un paciente.
     * Guarda automáticamente los dientes asociados gracias a CascadeType.ALL
     */
    public Odontograma crearOdontograma(Odontograma odontograma) {
        odontograma.setFechaCreacion(new Date());
        odontograma.setFechaActualizacion(new Date());
        return odontogramaRepo.save(odontograma);
    }

    /**
     * Obtiene todos los odontogramas de un paciente específico.
     * Útil para ver el historial de cambios en la dentición del paciente.
     */
    public List<Odontograma> obtenerPorFicha(Long fichaId) {
        return odontogramaRepo.findByFichaId(fichaId);
    }

    /**
     * Obtiene un odontograma específico por su ID.
     */
    public Odontograma obtenerPorId(Long id) {
        return odontogramaRepo.findById(id).orElse(null);
    }

    /**
     * Actualiza un odontograma existente.
     */
    public Odontograma actualizarOdontograma(Long id, Odontograma odontogramaActualizado) {
        Odontograma odontograma = odontogramaRepo.findById(id).orElse(null);
        if (odontograma != null) {
            odontograma.setObservacionesGenerales(odontogramaActualizado.getObservacionesGenerales());
            odontograma.setDientes(odontogramaActualizado.getDientes());
            odontograma.setFechaActualizacion(new Date());
            return odontogramaRepo.save(odontograma);
        }
        return null;
    }

    /**
     * Elimina un odontograma.
     */
    public void eliminarOdontograma(Long id) {
        odontogramaRepo.deleteById(id);
    }

    /**
     * Obtiene todos los dientes de un odontograma específico.
     */
    public List<Diente> obtenerDientesPorOdontograma(Long odontogramaId) {
        return dienteRepo.findByOdontogramaId(odontogramaId);
    }

    /**
     * Actualiza el estado de un diente específico.
     */
    public Diente actualizarDiente(Long dienteId, Diente dienteActualizado) {
        Diente diente = dienteRepo.findById(dienteId).orElse(null);
        if (diente != null) {
            diente.setEstado(dienteActualizado.getEstado());
            diente.setObservaciones(dienteActualizado.getObservaciones());
            return dienteRepo.save(diente);
        }
        return null;
    }

    public List<Odontograma> listarTodo() {
        return odontogramaRepo.findAll();
    }
}

package com.epn.odontologia.odontograma.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.epn.odontologia.odontograma.models.Odontograma;
import com.epn.odontologia.odontograma.models.Diente;
import com.epn.odontologia.odontograma.services.OdontogramaService;
import java.util.List;

@RestController
@RequestMapping("/api/odontogramas")
@CrossOrigin(origins = "*")
public class OdontogramaController {

    @Autowired
    private OdontogramaService odontogramaService;

    /**
     * Crea un nuevo odontograma
     */
    @PostMapping("/crear")
    public Odontograma crear(@RequestBody Odontograma odontograma) {
        return odontogramaService.crearOdontograma(odontograma);
    }

    /**
     * Obtiene todos los odontogramas de un paciente específico
     */
    @GetMapping("/ficha/{fichaId}")
    public List<Odontograma> listarPorPaciente(@PathVariable Long fichaId) {
        return odontogramaService.obtenerPorFicha(fichaId);
    }

    /**
     * Obtiene un odontograma específico por su ID
     */
    @GetMapping("/{id}")
    public Odontograma obtenerPorId(@PathVariable Long id) {
        return odontogramaService.obtenerPorId(id);
    }

    /**
     * Actualiza un odontograma existente
     */
    @PutMapping("/{id}")
    public Odontograma actualizar(@PathVariable Long id, @RequestBody Odontograma odontograma) {
        return odontogramaService.actualizarOdontograma(id, odontograma);
    }

    /**
     * Elimina un odontograma
     */
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        odontogramaService.eliminarOdontograma(id);
    }

    /**
     * Obtiene todos los dientes de un odontograma
     */
    @GetMapping("/{odontogramaId}/dientes")
    public List<Diente> obtenerDientes(@PathVariable Long odontogramaId) {
        return odontogramaService.obtenerDientesPorOdontograma(odontogramaId);
    }

    @GetMapping
    public List<Odontograma> listarTodos() {
        return odontogramaService.listarTodo();
    }
    /**
     * Actualiza el estado de un diente específico
     */
    @PutMapping("/dientes/{dienteId}")
    public Diente actualizarDiente(@PathVariable Long dienteId, @RequestBody Diente diente) {
        return odontogramaService.actualizarDiente(dienteId, diente);
    }

}

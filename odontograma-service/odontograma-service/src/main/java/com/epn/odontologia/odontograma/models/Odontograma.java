package com.epn.odontologia.odontograma.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "odontogramas")
@Data
public class Odontograma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long pacienteId;
    private Date fechaCreacion;
    private Date fechaActualizacion;
    private String observacionesGenerales;
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "odontogramaId")
    private List<Diente> dientes;
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getPacienteId() {
        return pacienteId;
    }
    
    public void setPacienteId(Long pacienteId) {
        this.pacienteId = pacienteId;
    }
    
    public Date getFechaCreacion() {
        return fechaCreacion;
    }
    
    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }
    
    public Date getFechaActualizacion() {
        return fechaActualizacion;
    }
    
    public void setFechaActualizacion(Date fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }
    
    public String getObservacionesGenerales() {
        return observacionesGenerales;
    }
    
    public void setObservacionesGenerales(String observacionesGenerales) {
        this.observacionesGenerales = observacionesGenerales;
    }
    
    public List<Diente> getDientes() {
        return dientes;
    }
    
    public void setDientes(List<Diente> dientes) {
        this.dientes = dientes;
    }
}

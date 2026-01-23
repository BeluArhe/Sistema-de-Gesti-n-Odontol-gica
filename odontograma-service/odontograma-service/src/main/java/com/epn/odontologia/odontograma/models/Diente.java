package com.epn.odontologia.odontograma.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "dientes")
@Data
public class Diente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Integer numeroDiente; // 1-32 según numeración FDI
    private String estado; // Sano, Cariado, Obturado, Ausente, etc.
    private String observaciones;
    private Long odontogramaId;
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Integer getNumeroDiente() {
        return numeroDiente;
    }
    
    public void setNumeroDiente(Integer numeroDiente) {
        this.numeroDiente = numeroDiente;
    }
    
    public String getEstado() {
        return estado;
    }
    
    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    public String getObservaciones() {
        return observaciones;
    }
    
    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
    
    public Long getOdontogramaId() {
        return odontogramaId;
    }
    
    public void setOdontogramaId(Long odontogramaId) {
        this.odontogramaId = odontogramaId;
    }
}

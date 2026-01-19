package com.epn.odontologia.fichas.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "presupuestos")
@Data
public class Presupuesto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Double costo; // Valor total del tratamiento
    private String detalleTratamiento;
    private Boolean aprobado;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Double getCosto() {
		return costo;
	}
	public void setCosto(Double costo) {
		this.costo = costo;
	}
	public String getDetalleTratamiento() {
		return detalleTratamiento;
	}
	public void setDetalleTratamiento(String detalleTratamiento) {
		this.detalleTratamiento = detalleTratamiento;
	}
	public Boolean getAprobado() {
		return aprobado;
	}
	public void setAprobado(Boolean aprobado) {
		this.aprobado = aprobado;
	}
}
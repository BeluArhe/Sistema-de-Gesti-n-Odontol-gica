package com.epn.odontologia.fichas.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "examenes_fisicos")
@Data
public class ExamenFisico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String tumefaccion; // Campo específico del diagrama
    private String coloracion;
    private String sensibilidadPercusion;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTumefaccion() {
		return tumefaccion;
	}
	public void setTumefaccion(String tumefaccion) {
		this.tumefaccion = tumefaccion;
	}
	public String getColoracion() {
		return coloracion;
	}
	public void setColoracion(String coloracion) {
		this.coloracion = coloracion;
	}
	public String getSensibilidadPercusion() {
		return sensibilidadPercusion;
	}
	public void setSensibilidadPercusion(String sensibilidadPercusion) {
		this.sensibilidadPercusion = sensibilidadPercusion;
	}
}
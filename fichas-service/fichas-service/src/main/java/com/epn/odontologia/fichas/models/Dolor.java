package com.epn.odontologia.fichas.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "dolores")
@Data
public class Dolor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String intensidad; // Campo requerido en tu diagrama
    private String tipo; // Ejemplo: Punzante, sordo, etc.
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getIntensidad() {
		return intensidad;
	}
	public void setIntensidad(String intensidad) {
		this.intensidad = intensidad;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
    
}
package com.epn.odontologia.fichas.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "diagnosticos")
@Data
public class Diagnostico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String causaCaries; // Según tu diagrama
    private String observaciones;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCausaCaries() {
		return causaCaries;
	}
	public void setCausaCaries(String causaCaries) {
		this.causaCaries = causaCaries;
	}
	public String getObservaciones() {
		return observaciones;
	}
	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}
}

package com.epn.odontologia.fichas.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "fichas_endodoncia")
@Data
public class FichaEndodoncia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "paciente_id", nullable = false)
    private Long pacienteId; 

    private String motivoConsulta;
    private LocalDate fecha;

    // --- RELACIONES 1:1 ---
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "diagnostico_id")
    private Diagnostico diagnostico;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "dolor_id") // Agregado según diagrama
    private Dolor dolor;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "examen_fisico_id") // Agregado según diagrama
    private ExamenFisico examenFisico;

    // --- RELACIONES 1:N ---
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "ficha_id")
    private List<Presupuesto> presupuestos; // Agregado según diagrama

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "ficha_id")
    private List<Pago> pagos;

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

	public String getMotivoConsulta() {
		return motivoConsulta;
	}

	public void setMotivoConsulta(String motivoConsulta) {
		this.motivoConsulta = motivoConsulta;
	}

	public LocalDate getFecha() {
		return fecha;
	}

	public void setFecha(LocalDate fecha) {
		this.fecha = fecha;
	}

	public Diagnostico getDiagnostico() {
		return diagnostico;
	}

	public void setDiagnostico(Diagnostico diagnostico) {
		this.diagnostico = diagnostico;
	}

	public Dolor getDolor() {
		return dolor;
	}

	public void setDolor(Dolor dolor) {
		this.dolor = dolor;
	}

	public ExamenFisico getExamenFisico() {
		return examenFisico;
	}

	public void setExamenFisico(ExamenFisico examenFisico) {
		this.examenFisico = examenFisico;
	}

	public List<Presupuesto> getPresupuestos() {
		return presupuestos;
	}

	public void setPresupuestos(List<Presupuesto> presupuestos) {
		this.presupuestos = presupuestos;
	}

	public List<Pago> getPagos() {
		return pagos;
	}

	public void setPagos(List<Pago> pagos) {
		this.pagos = pagos;
	}
}
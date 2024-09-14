package com.example.msgestion_seguimiento.entity;

import java.time.LocalDate;
import com.example.msgestion_seguimiento.dto.EmpresaDto;
import com.example.msgestion_seguimiento.dto.EstudianteDto;
import com.example.msgestion_seguimiento.dto.OfertaDto;
import lombok.Data;
import jakarta.persistence.*;

@Entity
@Data
public class Seguimiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer estudianteId;  // Referencia al ID de Estudiante
    private Integer ofertaId;      // Referencia al ID de Oferta
    private Integer empresaId;     // Referencia al ID de Empresa
    private String evaluacion;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    @Transient  // No se guarda en la base de datos
    private EmpresaDto empresaDto;  //DTO de Estudiante para cargar los datos desde ms-gestion_empresa

    @Transient  // No se guarda en la base de datos
    private EstudianteDto estudianteDto;  // DTO de Estudiante para cargar los datos desde ms-gestion_estudiantes

    @Transient  // No se guarda en la base de datos
    private OfertaDto ofertaDto;  // DTO de Oferta para cargar los datos desde ms-gestion_oferta
}
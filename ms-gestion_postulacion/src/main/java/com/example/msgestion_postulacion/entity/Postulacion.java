package com.example.msgestion_postulacion.entity;

import java.time.LocalDate;

import com.example.msgestion_postulacion.dto.EstudianteDto;
import com.example.msgestion_postulacion.dto.OfertaDto;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Postulacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer estudianteId;  // Referencia al ID de Estudiante
    private Integer ofertaId;      // Referencia al ID de Oferta
    
    private String estadoPostulacion; // EN_REVISION, ACEPTADO, RECHAZADO

    private LocalDate fechaPostulacion;

    @Transient  // No se guarda en la base de datos
    private EstudianteDto estudianteDto;  // DTO de Estudiante para cargar los datos desde ms-gestion_estudiantes

    @Transient  // No se guarda en la base de datos
    private OfertaDto ofertaDto;  // DTO de Oferta para cargar los datos desde ms-gestion_oferta
}
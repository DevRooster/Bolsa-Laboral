package com.example.msgestion_postulacion.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Postulacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    //@ManyToOne
    //private Estudiante estudiante; // Relación con el estudiante que postula

    //@ManyToOne
    //private Oferta oferta; // Relación con la oferta a la que se postula
    
    private String EstadoPostulacion; // EN_REVISION, ACEPTADO, RECHAZADO

    private LocalDate fechaPostulacion;
}
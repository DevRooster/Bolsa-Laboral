package com.example.msgestion_seguimiento.entity;

import java.time.LocalDate;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Data
public class Seguimiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    //@ManyToOne
    //private Estudiante estudiante; 
    // Estudiante relacionado

    //@ManyToOne
    //private Empresa empresa; 
    // Empresa relacionada

    //@ManyToOne
    //private Oferta oferta; 
    // Oferta relacionada

    private String evaluacion;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
}

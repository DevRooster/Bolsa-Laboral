package com.example.msgestion_documento.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Documento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;
    private String tipo; // Ejemplo: CV, Certificado, Convenio
    private String urlAlmacenamiento; // URL del almacenamiento

    //@ManyToOne
    //private Estudiante estudiante; 
    // Relación con el estudiante
}
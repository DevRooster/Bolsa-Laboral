package com.example.msgestion_oferta.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Oferta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String titulo;
    private String descripcion;
    private String ubicacion;
    private String tipoPracticante;
    private String duracion;
}
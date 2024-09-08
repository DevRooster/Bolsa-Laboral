package com.example.msgestion_notificacion.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Notificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String mensaje;
    private LocalDateTime fechaEnvio;

    //@ManyToOne
    //private Usuario usuario; // Relación con el usuario que recibe la notificación
}
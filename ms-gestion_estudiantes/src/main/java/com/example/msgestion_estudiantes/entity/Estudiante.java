package com.example.msgestion_estudiantes.entity;

import com.example.msgestion_estudiantes.dto.AuthUserDto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Estudiante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nombre;
    private String apellido;
    private String carrera;
    private String universidad;
    private String habilidades;
    private String experiencia;

    private Integer authUserId;
    //MS AuthUser
    @Transient
    private AuthUserDto authUserDto;


}
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

    // Almacenar solo el ID del usuario autenticado
    private Integer authUserId;

    @Transient
    private AuthUserDto authUserDto;

    // Método setter para authUserDto
    public void setAuthUserDto(AuthUserDto authUserDto) {
        this.authUserDto = authUserDto;
    }
}
package com.example.msgestion_seguimiento.dto;

import lombok.Data;

@Data
public class EstudianteDto {
    private Integer id;
    private String nombre;
    private String apellido;
    private String carrera;
    private String universidad;
    private String habilidades;
    private String experiencia;
}
package com.example.msgestion_seguimiento.dto;

import lombok.Data;

@Data
public class EmpresaDto {
    private Integer id;
    private String nombre;
    private String sector;
    private String descripcion;
    private String direccion;
    private String telefono;
}
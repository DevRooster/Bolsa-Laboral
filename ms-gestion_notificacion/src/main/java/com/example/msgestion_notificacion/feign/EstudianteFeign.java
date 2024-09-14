package com.example.msgestion_notificacion.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.msgestion_notificacion.dto.EstudianteDto;

@FeignClient(name = "ms-gestionestudiantes-service",path = "/estudiante")
public interface EstudianteFeign {
    @GetMapping("/{id}")
    EstudianteDto buscarPorId(@PathVariable("id") Integer id);
}

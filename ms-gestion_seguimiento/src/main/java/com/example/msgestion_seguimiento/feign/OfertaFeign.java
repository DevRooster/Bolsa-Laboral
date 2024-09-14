package com.example.msgestion_seguimiento.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.msgestion_seguimiento.dto.OfertaDto;

@FeignClient(name = "ms-gestionoferta-service", path = "/oferta")
public interface OfertaFeign {
    @GetMapping("/{id}")
    OfertaDto buscarPorId(@PathVariable("id") Integer id);
}
package com.example.msgestion_seguimiento.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.example.msgestion_seguimiento.dto.EmpresaDto;

@FeignClient(name = "ms-gestionempresa-service",path = "/empresa")
public interface EmpresaFeign {
    @GetMapping("/{id}")
    EmpresaDto buscarPorId(@PathVariable("id") Integer id);
}
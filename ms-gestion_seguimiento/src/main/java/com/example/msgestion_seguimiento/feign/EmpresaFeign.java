package com.example.msgestion_seguimiento.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.example.msgestion_seguimiento.dto.EmpresaDto;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

@FeignClient(name = "ms-gestionempresa-service",path = "/empresa")
public interface EmpresaFeign {
    @CircuitBreaker(name = "empresaListarPorIdCB", fallbackMethod = "fallbackMethod")
    @GetMapping("/{id}")
    EmpresaDto buscarPorId(@PathVariable("id") Integer id);

    // Método de fallback
    default EmpresaDto fallbackMethod(Integer id, Throwable throwable) {
        // Devuelve un objeto EstudianteDto con valores predeterminados
        EmpresaDto empresaFallback = new EmpresaDto();
        empresaFallback.setId(id);
        empresaFallback.setNombre("Estudiante no disponible");
        // Establece otros valores predeterminados según tu estructura de EstudianteDto
        return empresaFallback;
    }
}
package com.example.msgestion_estudiantes.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.example.msgestion_estudiantes.dto.AuthUserDto;

@FeignClient(name = "ms-auth-service",path = "/auth")
public interface AuthUserFeign {
    @GetMapping("/{id}")
    ResponseEntity<AuthUserDto> buscarPorId(@PathVariable Integer id);
}
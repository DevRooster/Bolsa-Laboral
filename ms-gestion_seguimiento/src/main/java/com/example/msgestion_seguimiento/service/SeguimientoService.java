package com.example.msgestion_seguimiento.service;

import com.example.msgestion_seguimiento.entity.Seguimiento;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public interface SeguimientoService {
    List<Seguimiento> lista();
    Seguimiento guardar(Seguimiento seguimiento);
    Optional<Seguimiento> buscarPorId(Integer id);
    Seguimiento actualizar(Seguimiento seguimiento);
    void eleminar(Integer id);
}
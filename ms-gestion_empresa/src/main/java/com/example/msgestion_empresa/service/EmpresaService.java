package com.example.msgestion_estudiantes.service;


import com.example.msgestion_estudiantes.entity.Empresa;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public interface EmpresaService {
    List<Empresa> lista();
    Estudiante guardar(Empresa empresa);
    Optional<Empresa> buscarPorId(Integer id);
    Estudiante actualizar(Empresa empresa);
    void eleminar(Integer id);
}

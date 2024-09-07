package com.example.msgestion_estudiantes.service.impl;

import com.example.msgestion_estudiantes.entity.Empresa;
import com.example.msgestion_estudiantes.repository.EmpresaRepository;
import com.example.msgestion_estudiantes.service.EmpresaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class EmpresaServiceImpl implements EmpresaService {
    @Autowired
    private EmpresaRepository empresaRepository;

    @Override
    public List<Empresa> lista() {
        return empresaRepository.findAll();
    }

    @Override
    public Estudiante guardar(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    @Override
    public Optional<Empresa> buscarPorId(Integer id) {
        return empresaRepository.findById(id);
    }

    @Override
    public Estudiante actualizar(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    @Override
    public void eleminar(Integer id) {
        empresaRepository.deleteById(id);

    }
}

package com.example.msgestion_seguimiento.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.msgestion_seguimiento.entity.Seguimiento;
import com.example.msgestion_seguimiento.repository.SeguimientoRepository;
import com.example.msgestion_seguimiento.service.SeguimientoService;

import java.util.List;
import java.util.Optional;
@Service
public class SeguimientoServiceImpl implements SeguimientoService {
    @Autowired
    private SeguimientoRepository seguimientoRepository;

    @Override
    public List<Seguimiento> lista() {
        return seguimientoRepository.findAll();
    }

    @Override
    public Seguimiento guardar(Seguimiento seguimiento) {
        return seguimientoRepository.save(seguimiento);
    }

    @Override
    public Optional<Seguimiento> buscarPorId(Integer id) {
        return seguimientoRepository.findById(id);
    }

    @Override
    public Seguimiento actualizar(Seguimiento seguimiento) {
        return seguimientoRepository.save(seguimiento);
    }

    @Override
    public void eleminar(Integer id) {
        seguimientoRepository.deleteById(id);

    }
}
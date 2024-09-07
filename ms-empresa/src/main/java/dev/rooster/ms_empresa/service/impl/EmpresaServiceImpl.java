package dev.rooster.ms_empresa.service.impl;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.rooster.ms_empresa.entity.Empresa;
import dev.rooster.ms_empresa.repository.EmpresaRespository;
import dev.rooster.ms_empresa.service.EmpresaService;

@Service
public class EmpresaServiceImpl implements EmpresaService{
    @Autowired
    private EmpresaRespository empresaRespository;

    @Override
    public List<Empresa> listar() {
        return empresaRespository.findAll();
    }

    @Override
    public Empresa guardar(Empresa empresa) {
        return empresaRespository.save(empresa);
    }

    @Override
    public Optional<Empresa> buscarPorId(Integer id) {
        return empresaRespository.findById(id);
    }

    @Override
    public Empresa actualizar(Empresa empresa) {
        return empresaRespository.save(empresa);
    }

    @Override
    public void eliminar(Integer id) {
        empresaRespository.deleteById(id);
    }
}

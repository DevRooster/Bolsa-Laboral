package dev.rooster.ms_empresa.service;

import java.util.*;

import dev.rooster.ms_empresa.entity.Empresa;

public interface EmpresaService {
    public List<Empresa> listar();
    public Empresa guardar(Empresa empresa);
    public Optional<Empresa> buscarPorId(Integer id);
    public Empresa actualizar (Empresa empresa);
    public void eliminar(Integer id);
}

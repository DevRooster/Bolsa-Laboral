package dev.rooster.ms_estudiante.service;

import java.util.*;

import dev.rooster.ms_estudiante.entity.DatPersonales;

public interface EstudianteService {
    public List<DatPersonales> listar();
    public DatPersonales guardar(DatPersonales datPersonales);
    public Optional<DatPersonales> buscarPorId(Integer id);
    public DatPersonales actualizar(DatPersonales datPersonales);
    public void eliminar(Integer id);
}

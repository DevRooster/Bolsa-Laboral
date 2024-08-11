package dev.rooster.ms_docente.service;

import java.util.List;
import java.util.Optional;

import dev.rooster.ms_docente.entity.Docente;

public interface DocenteService {
    public List<Docente> listar();
    public Docente guardar (Docente docente);
    public Optional<Docente> buscarPorId(Integer id);
    public Docente actualizar(Docente docente);
    public void eliminar(Integer id);
}

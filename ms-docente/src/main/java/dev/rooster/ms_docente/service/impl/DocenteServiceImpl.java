package dev.rooster.ms_docente.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.rooster.ms_docente.entity.Docente;
import dev.rooster.ms_docente.repository.DocenteRepository;
import dev.rooster.ms_docente.service.DocenteService;

@Service
public class DocenteServiceImpl implements DocenteService{
    @Autowired
    private DocenteRepository docenteRepository;

    @Override
    public List<Docente> listar() {
        return docenteRepository.findAll();
    }

    @Override
    public Docente guardar(Docente docente) {
        return docenteRepository.save(docente);
    }

    @Override
    public Optional<Docente> buscarPorId(Integer id) {
        return docenteRepository.findById(id);
    }

    @Override
    public Docente actualizar(Docente docente) {
        return docenteRepository.save(docente);
    }

    @Override
    public void eliminar(Integer id) {
        docenteRepository.deleteById(id);
    }     
}

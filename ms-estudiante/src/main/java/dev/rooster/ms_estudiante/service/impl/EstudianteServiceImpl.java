package dev.rooster.ms_estudiante.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.rooster.ms_estudiante.entity.DatPersonales;
import dev.rooster.ms_estudiante.repository.EstudianteRepository;
import dev.rooster.ms_estudiante.service.EstudianteService;

@Service
public class EstudianteServiceImpl implements EstudianteService{
    @Autowired
    private EstudianteRepository estudianteRepository;

    @Override
    public List<DatPersonales> listar() {
        return estudianteRepository.findAll();
    }

    @Override
    public DatPersonales guardar(DatPersonales datPersonales) {
        return estudianteRepository.save(datPersonales);
    }

    @Override
    public Optional<DatPersonales> buscarPorId(Integer id) {
        return estudianteRepository.findById(id);
    }

    @Override
    public DatPersonales actualizar(DatPersonales datPersonales) {
        return estudianteRepository.save(datPersonales);
    }

    @Override
    public void eliminar(Integer id) {
        estudianteRepository.deleteById(id);
    } 
}

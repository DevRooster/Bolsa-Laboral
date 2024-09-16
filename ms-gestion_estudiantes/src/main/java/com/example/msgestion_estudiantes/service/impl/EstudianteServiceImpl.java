package com.example.msgestion_estudiantes.service.impl;

import com.example.msgestion_estudiantes.dto.AuthUserDto;
import com.example.msgestion_estudiantes.entity.Estudiante;
import com.example.msgestion_estudiantes.feign.AuthUserFeign;
import com.example.msgestion_estudiantes.repository.EstudianteRepository;
import com.example.msgestion_estudiantes.service.EstudianteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteServiceImpl implements EstudianteService {
    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private AuthUserFeign authUserFeign;

    @Override
    public List<Estudiante> lista() {
        return estudianteRepository.findAll();
    }

    @Override
    public Estudiante guardar(Estudiante estudiante) {
        // Aquí se obtiene datos del usuario usando el método correcto
        AuthUserDto authUserDto = authUserFeign.buscarPorId(estudiante.getAuthUser().getId());
        estudiante.setAuthUser(authUserDto);
        return estudianteRepository.save(estudiante);
    }

    @Override
    public Optional<Estudiante> buscarPorId(Integer id) {
        return estudianteRepository.findById(id);
    }

    @Override
    public Estudiante actualizar(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    @Override
    public void eleminar(Integer id) {
        estudianteRepository.deleteById(id);

    }

    @Override
    public AuthUserDto obtenerUsuarioPorId(Integer id) {
        return authUserFeign.buscarPorId(id);
    }
}

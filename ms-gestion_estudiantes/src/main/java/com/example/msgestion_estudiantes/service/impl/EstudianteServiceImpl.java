package com.example.msgestion_estudiantes.service.impl;

import com.example.msgestion_estudiantes.dto.AuthUserDto;
import com.example.msgestion_estudiantes.entity.Estudiante;
import com.example.msgestion_estudiantes.feign.AuthUserFeign;
import com.example.msgestion_estudiantes.repository.EstudianteRepository;
import com.example.msgestion_estudiantes.service.EstudianteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
        return estudianteRepository.save(estudiante);
    }

    @Override
    public Optional<Estudiante> buscarPorId(Integer id) {
        Optional<Estudiante> estudiante = estudianteRepository.findById(id);
        
        if (estudiante.isPresent()) {
            // Obtener el AuthUser desde ms-auth usando el authUserId
            Integer authUserId = estudiante.get().getAuthUserId();
            if (authUserId != null) {
                // Llamada al Feign Client para obtener ResponseEntity<AuthUserDto>
                ResponseEntity<AuthUserDto> responseEntity = authUserFeign.buscarPorId(authUserId);
                
                // Obtener el AuthUserDto del ResponseEntity
                AuthUserDto authUserDto = responseEntity.getBody();
                estudiante.get().setAuthUserDto(authUserDto);
            }
        }

        return estudiante;
    }

    @Override
    public Estudiante actualizar(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    @Override
    public void eleminar(Integer id) {
        estudianteRepository.deleteById(id);

    }
}

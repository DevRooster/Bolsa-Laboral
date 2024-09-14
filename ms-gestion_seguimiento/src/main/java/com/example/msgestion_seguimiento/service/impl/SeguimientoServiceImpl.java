package com.example.msgestion_seguimiento.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.msgestion_seguimiento.dto.EmpresaDto;
import com.example.msgestion_seguimiento.dto.EstudianteDto;
import com.example.msgestion_seguimiento.dto.OfertaDto;
import com.example.msgestion_seguimiento.entity.Seguimiento;
import com.example.msgestion_seguimiento.feign.EmpresaFeign;
import com.example.msgestion_seguimiento.feign.EstudianteFeign;
import com.example.msgestion_seguimiento.feign.OfertaFeign;
import com.example.msgestion_seguimiento.repository.SeguimientoRepository;
import com.example.msgestion_seguimiento.service.SeguimientoService;

import java.util.List;
import java.util.Optional;
@Service
public class SeguimientoServiceImpl implements SeguimientoService {
    @Autowired
    private SeguimientoRepository seguimientoRepository;

    @Autowired
    private EstudianteFeign estudianteFeign;

    @Autowired
    private OfertaFeign ofertaFeign;

    @Autowired
    private EmpresaFeign empresaFeign;

    @Override
    public List<Seguimiento> lista() {
        List<Seguimiento> seguimientos = seguimientoRepository.findAll();
        // Carga los datos de Estudiante, Oferta y Empresa para cada seguimiento
        for (Seguimiento seguimiento : seguimientos){
            if (seguimiento.getEstudianteId() != null) {
                EstudianteDto estudianteDto = estudianteFeign.buscarPorId(seguimiento.getEstudianteId());
                seguimiento.setEstudianteDto(estudianteDto);    // Asignar el Estudiante DTO
            }
            if (seguimiento.getOfertaId() != null) {
                OfertaDto ofertaDto = ofertaFeign.buscarPorId(seguimiento.getOfertaId());
                seguimiento.setOfertaDto(ofertaDto);    // Asignar el Oferta DTO
                
            }
            if (seguimiento.getEmpresaId() != null) {
                EmpresaDto empresaDto = empresaFeign.buscarPorId(seguimiento.getEmpresaId());
                seguimiento.setEmpresaDto(empresaDto);  
            }
        } 
        return seguimientos;
    }

    @Override
    public Seguimiento guardar(Seguimiento seguimiento) {
        return seguimientoRepository.save(seguimiento);
    }

    @Override
    public Optional<Seguimiento> buscarPorId(Integer id) {
        Optional<Seguimiento> seguimientoOptional = seguimientoRepository.findById(id);
        // Si se encuentra el seguimiento, cargar datos de Estudiante, Oferta y Empresa
        if (seguimientoOptional.isPresent()) {
            Seguimiento seguimiento = seguimientoOptional.get();
            if (seguimiento.getEstudianteId() != null) {
                EstudianteDto estudianteDto = estudianteFeign.buscarPorId(seguimiento.getEstudianteId());
                seguimiento.setEstudianteDto(estudianteDto);  // Asignar el Estudiante DTO
            }
            if (seguimiento.getOfertaId() != null) {
                OfertaDto ofertaDto = ofertaFeign.buscarPorId(seguimiento.getOfertaId());
                seguimiento.setOfertaDto(ofertaDto);  // Asignar el Oferta DTO
            }
            if (seguimiento.getEmpresaId() != null) {
                EmpresaDto empresaDto = empresaFeign.buscarPorId(seguimiento.getEmpresaId());
                seguimiento.setEmpresaDto(empresaDto);  // Asignar la Empresa DTO
            }
            return Optional.of(seguimiento);           
        }
        return Optional.empty();
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
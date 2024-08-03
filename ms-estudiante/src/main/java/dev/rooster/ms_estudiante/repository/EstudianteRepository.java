package dev.rooster.ms_estudiante.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.rooster.ms_estudiante.entity.DatPersonales;

public interface EstudianteRepository extends JpaRepository<DatPersonales, Integer>{
    
}

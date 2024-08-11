package dev.rooster.ms_docente.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.rooster.ms_docente.entity.Docente;

public interface DocenteRepository extends JpaRepository<Docente, Integer>{
    
}

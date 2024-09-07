package dev.rooster.ms_empresa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.rooster.ms_empresa.entity.Empresa;

public interface EmpresaRespository  extends JpaRepository<Empresa, Integer>{
    
}

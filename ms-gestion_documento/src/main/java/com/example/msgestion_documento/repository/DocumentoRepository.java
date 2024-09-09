package com.example.msgestion_documento.repository;


import com.example.msgestion_documento.entity.Documento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentoRepository extends JpaRepository <Documento, Integer> {
}
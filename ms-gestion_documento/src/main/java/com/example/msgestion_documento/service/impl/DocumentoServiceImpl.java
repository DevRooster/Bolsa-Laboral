package com.example.msgestion_documento.service.impl;

import com.example.msgestion_documento.entity.Documento;
import com.example.msgestion_documento.repository.DocumentoRepository;
import com.example.msgestion_documento.service.DocumentoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class DocumentoServiceImpl implements DocumentoService {
    @Autowired
    private DocumentoRepository documentoRepository;

    @Override
    public List<Documento> lista() {
        return documentoRepository.findAll();
    }

    @Override
    public Documento guardar(Documento documento) {
        return documentoRepository.save(documento);
    }

    @Override
    public Optional<Documento> buscarPorId(Integer id) {
        return documentoRepository.findById(id);
    }

    @Override
    public Documento actualizar(Documento documento) {
        return documentoRepository.save(documento);
    }

    @Override
    public void eleminar(Integer id) {
        documentoRepository.deleteById(id);
    }
}

package com.example.msgestion_documento.service;

import com.example.msgestion_documento.entity.Documento;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

@Service
public interface DocumentoService {
    List<Documento> lista();
    Documento guardar(Documento documento);
    Optional<Documento> buscarPorId(Integer id);
    Documento actualizar(Documento documento);
    void eleminar(Integer id);
}

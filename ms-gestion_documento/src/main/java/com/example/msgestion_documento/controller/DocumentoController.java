package com.example.msgestion_documento.controller;

import com.example.msgestion_documento.entity.Documento;
import com.example.msgestion_documento.service.DocumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
@RestController
@RequestMapping("/documento")
public class DocumentoController {
    @Autowired
    private DocumentoService DocumentoService;

    @GetMapping
    ResponseEntity<List<Documento>> lista(){
        return ResponseEntity.ok(DocumentoService.lista());
    }
    @PostMapping
    ResponseEntity<Documento> guardar(@RequestBody Documento documento) {
        return ResponseEntity.ok(DocumentoService.guardar((documento)));
    }

    @GetMapping("/{id}")
    ResponseEntity<Documento> buscarPorId(@PathVariable(required = true) Integer id){
        return ResponseEntity.ok(DocumentoService.buscarPorId(id).get());
    }

    @PutMapping
    ResponseEntity<Documento> actualizar(@RequestBody Documento documento){
        return ResponseEntity.ok(DocumentoService.actualizar((documento)));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<List<Documento>> eleminar(@PathVariable(required = true) Integer id){
        DocumentoService.eleminar(id);
        return ResponseEntity.ok(DocumentoService.lista());
    }
}
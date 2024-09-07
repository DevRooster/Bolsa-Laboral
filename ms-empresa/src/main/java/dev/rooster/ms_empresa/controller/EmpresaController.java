package dev.rooster.ms_empresa.controller;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dev.rooster.ms_empresa.entity.Empresa;
import dev.rooster.ms_empresa.service.EmpresaService;

@RestController
@RequestMapping("/empresa")
public class EmpresaController {
    @Autowired
    private EmpresaService empresaService;

    @GetMapping
    public ResponseEntity<List<Empresa>> listar() {
        return ResponseEntity.ok(empresaService.listar());
    }

    @PostMapping
    public ResponseEntity<Empresa> guardar(@RequestBody Empresa empresa) {
        return ResponseEntity.ok(empresaService.guardar(empresa));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empresa> buscarPorId(@PathVariable(required = true) Integer id) {
        return ResponseEntity.ok(empresaService.buscarPorId(id).get());
    }

    @PutMapping
    public ResponseEntity<Empresa> actualizar(@RequestBody Empresa empresa) {
        return ResponseEntity.ok(empresaService.actualizar(empresa));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<Empresa>> eliminar(@PathVariable(required = true) Integer id) {
        empresaService.eliminar(id);
        return ResponseEntity.ok(empresaService.listar());
    }    
}

package com.example.msgestion_seguimiento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.msgestion_seguimiento.entity.Seguimiento;
import com.example.msgestion_seguimiento.service.SeguimientoService;

import java.util.List;

@RestController
@RequestMapping("/seguimiento")
public class SeguimientoController {
    @Autowired
    private SeguimientoService seguimientoService;

    @GetMapping
    ResponseEntity<List<Seguimiento>> lista(){
        return ResponseEntity.ok(seguimientoService.lista());
    }
    @PostMapping
    ResponseEntity<Seguimiento> guardar(@RequestBody Seguimiento seguimiento) {
        return ResponseEntity.ok(seguimientoService.guardar((seguimiento)));
    }

    @GetMapping("/{id}")
    ResponseEntity<Seguimiento> buscarPorId(@PathVariable(required = true) Integer id){
        return ResponseEntity.ok(seguimientoService.buscarPorId(id).get());

    }

    @PutMapping
    ResponseEntity<Seguimiento> actualizar(@RequestBody Seguimiento seguimiento){
        return ResponseEntity.ok(seguimientoService.actualizar((seguimiento)));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<List<Seguimiento>> eleminar(@PathVariable(required = true) Integer id){
        seguimientoService.eleminar(id);
        return ResponseEntity.ok(seguimientoService.lista());

    }
}
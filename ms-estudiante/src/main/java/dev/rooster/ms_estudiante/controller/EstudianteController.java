package dev.rooster.ms_estudiante.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dev.rooster.ms_estudiante.entity.DatPersonales;
import dev.rooster.ms_estudiante.service.EstudianteService;

@RestController
@RequestMapping("/estudiante")
public class EstudianteController {
    @Autowired
    private EstudianteService estudianteService;

    @GetMapping
    public ResponseEntity<List<DatPersonales>> listar() {
        return ResponseEntity.ok(estudianteService.listar());
    }

    @PostMapping
    public ResponseEntity<DatPersonales> guardar(@RequestBody DatPersonales datPersonales) {
        return ResponseEntity.ok(estudianteService.guardar(datPersonales));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DatPersonales> buscarPorId(@PathVariable(required = true) Integer id) {
        return ResponseEntity.ok(estudianteService.buscarPorId(id).get());
    }

    @PutMapping
    public ResponseEntity<DatPersonales> actualizar(@RequestBody DatPersonales datPersonales) {
        return ResponseEntity.ok(estudianteService.actualizar(datPersonales));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<DatPersonales>> eliminar(@PathVariable(required = true) Integer id) {
        estudianteService.eliminar(id);
        return ResponseEntity.ok(estudianteService.listar());
    }
}

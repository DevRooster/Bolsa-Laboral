package com.example.msgestion_postulacion.service.impl;

import com.example.msgestion_postulacion.entity.Postulacion;
import com.example.msgestion_postulacion.service.PostulacionService;
import com.example.msgestion_postulacion.repository.PostulacionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class PostulacionServiceImpl implements PostulacionService {
    @Autowired
    private PostulacionRepository postulacionRepository;

    @Override
    public List<Postulacion> lista() {
        return postulacionRepository.findAll();
    }

    @Override
    public Postulacion guardar(Postulacion postulacion) {
        return postulacionRepository.save(postulacion);
    }

    @Override
    public Optional<Postulacion> buscarPorId(Integer id) {
        return postulacionRepository.findById(id);
    }

    @Override
    public Oferta actualizar(Postulacion postulacion) {
        return postulacionRepository.save(postulacion);
    }

    @Override
    public void eleminar(Integer id) {
        postulacionRepository.deleteById(id);

    }
}

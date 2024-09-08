package com.example.msgestion_oferta.service.impl;



import com.example.msgestion_oferta.entity.Oferta;
import com.example.msgestion_oferta.repository.OfertaRepository;
import com.example.msgestion_oferta.service.OfertaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class OfertaServiceImpl implements OfertaService {
    @Autowired
    private OfertaRepository ofertaRepository;

    @Override
    public List<Oferta> lista() {
        return ofertaRepository.findAll();
    }

    @Override
    public Oferta guardar(Oferta oferta) {
        return ofertaRepository.save(oferta);
    }

    @Override
    public Optional<Oferta> buscarPorId(Integer id) {
        return ofertaRepository.findById(id);
    }

    @Override
    public Oferta actualizar(Oferta oferta) {
        return ofertaRepository.save(oferta);
    }

    @Override
    public void eleminar(Integer id) {
        ofertaRepository.deleteById(id);

    }
}

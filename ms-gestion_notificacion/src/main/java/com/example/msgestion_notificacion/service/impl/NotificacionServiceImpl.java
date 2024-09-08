package com.example.msgestion_notificacion.service.impl;

import com.example.msgestion_notificacion.entity.Notificacion;
import com.example.msgestion_notificacion.repository.NotificacionRepository;
import com.example.msgestion_notificacion.service.NotificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class NotificacionServiceImpl implements NotificacionService {
    @Autowired
    private NotificacionRepository notificacionRepository;

    @Override
    public List<Notificacion> lista() {
        return notificacionRepository.findAll();
    }

    @Override
    public Notificacion guardar(Notificacion notificacion) {
        return notificacionRepository.save(notificacion);
    }

    @Override
    public Optional<Notificacion> buscarPorId(Integer id) {
        return notificacionRepository.findById(id);
    }

    @Override
    public Notificacion actualizar(Notificacion notificacion) {
        return notificacionRepository.save(notificacion);
    }

    @Override
    public void eleminar(Integer id) {
        notificacionRepository.deleteById(id);

    }
}

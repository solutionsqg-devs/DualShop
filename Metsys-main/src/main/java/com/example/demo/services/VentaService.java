package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Customer;
import com.example.demo.entities.Venta;
import com.example.demo.repository.VentaRepository;

@Service
public class VentaService implements IVentaService{
    @Autowired
    private VentaRepository repository;
    
    @Override
    public List<Venta> getAll(){
        return (List<Venta>) repository.findAll();
    }

    @SuppressWarnings("null")
    @Override
    public Venta getById(Long id) {
      return (Venta) repository.findById(id).get();
    }

    @SuppressWarnings("null")
    @Override
    public void remove(Long id) {
        repository.deleteById(id);
    }

    @SuppressWarnings("null")
    @Override
    public void save(Venta venta) {
        repository.save(venta);
    }

}
package com.example.demo.services;

import com.example.demo.entities.Venta;

import java.util.List;

public interface IVentaService {
    List<Venta> getAll();
    Venta getById(Long id);
    void remove(Long id);
    void save(Venta venta);
}
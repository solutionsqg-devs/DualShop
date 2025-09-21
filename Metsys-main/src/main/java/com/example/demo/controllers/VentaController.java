package com.example.demo.controllers;


import com.example.demo.entities.Venta;
import com.example.demo.services.IVentaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
public class VentaController {

    @Autowired
    private IVentaService service;

    @GetMapping("/api/ventas")
    public List<Venta> getAll(){
        return service.getAll();
    }
    @GetMapping("/api/ventas/{id}")
    public Venta getById(@PathVariable String id){
        return service.getById(Long.parseLong(id));
    }
    @DeleteMapping("/api/ventas/{id}")
    public void remove(@PathVariable String id) {
        service.remove(Long.parseLong(id));
    }
    @PostMapping("/api/ventas")
    public void save(@RequestBody Venta venta) {
        service.save(venta);
    }

}
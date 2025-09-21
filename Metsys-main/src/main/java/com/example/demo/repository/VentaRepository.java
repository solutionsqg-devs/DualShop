package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Venta;

@Repository
public interface VentaRepository extends CrudRepository<Venta, Long> {
     
}

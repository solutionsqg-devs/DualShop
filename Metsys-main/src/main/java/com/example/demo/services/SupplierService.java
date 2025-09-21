package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Supplier;
import com.example.demo.repository.SupplierRepository;

@Service
public class SupplierService implements ISupplierService{
    @Autowired
    private SupplierRepository repository;
    
    @Override
    public List<Supplier> getAll(){
        return (List<Supplier>) repository.findAll();
    }

    @SuppressWarnings("null")
    @Override
    public Supplier getById(Long id) {
      return (Supplier) repository.findById(id).get();
    }

    @SuppressWarnings("null")
    @Override
    public void remove(Long id) {
        repository.deleteById(id);
    }

    @SuppressWarnings("null")
    @Override
    public void save(Supplier supplier) {
        repository.save(supplier);
    }

}
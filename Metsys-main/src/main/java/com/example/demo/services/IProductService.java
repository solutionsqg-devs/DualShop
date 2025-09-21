package com.example.demo.services;

import com.example.demo.entities.Product;

import java.util.List;

public interface IProductService {
    List<Product> getAll();
    Product getById(Long id);
    void remove(Long id);
    void save(Product product);
}
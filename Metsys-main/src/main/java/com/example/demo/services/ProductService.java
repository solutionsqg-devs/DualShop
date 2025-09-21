package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Product;
import com.example.demo.repository.ProductRepository;

@Service
public class ProductService implements IProductService{
    @Autowired
    private ProductRepository repository;
    
    @Override
    public List<Product> getAll(){
        return (List<Product>) repository.findAll();
    }

    @SuppressWarnings("null")
    @Override
    public Product getById(Long id) {
      return (Product) repository.findById(id).get();
    }

    @SuppressWarnings("null")
    @Override
    public void remove(Long id) {
        repository.deleteById(id);
    }

    @SuppressWarnings("null")
    @Override
    public void save(Product product) {
        repository.save(product);
    }

}
package com.example.demo.controllers;

import com.example.demo.entities.Product;
import com.example.demo.services.IProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;


import java.util.List;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;

@RestController
public class ProductController {

    @Autowired
    private IProductService service;

    @GetMapping("/api/products")
    public List<Product> getAll(){
        return service.getAll();
    }
    @GetMapping("/api/products/{id}")
    public Product getById(@PathVariable String id){
        return service.getById(Long.parseLong(id));
    }
    @DeleteMapping("/api/products/{id}")
    public void remove(@PathVariable String id) {
        service.remove(Long.parseLong(id));
    }
    @PostMapping("/api/products")
    public void save(@RequestParam("product") String productJson, @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Product product = objectMapper.readValue(productJson, Product.class);

        if (file != null && !file.isEmpty()) {
            String uploadDir = "src/main/resources/static/images/"; // Adjust this path as needed
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Path copyLocation = Paths.get(uploadDir + file.getOriginalFilename());
            Files.copy(file.getInputStream(), copyLocation, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
            product.setImg("/images/" + file.getOriginalFilename());
        }
        System.out.println("Image path to be saved: " + product.getImg()); // Línea de log
        service.save(product);
    }

}
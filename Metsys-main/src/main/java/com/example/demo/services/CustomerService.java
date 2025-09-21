package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Customer;
import com.example.demo.repository.CustomerRepository;

@Service
public class CustomerService implements ICustomerService{
    @Autowired
    private CustomerRepository repository;
    
    @Override
    public List<Customer> getAll(){
        return (List<Customer>) repository.findAll();
    }

    @SuppressWarnings("null")
    @Override
    public Customer getById(Long id) {
      return (Customer) repository.findById(id).get();
    }

    @SuppressWarnings("null")
    @Override
    public void remove(Long id) {
        repository.deleteById(id);
    }

    @SuppressWarnings("null")
    @Override
    public void save(Customer customer) {
        repository.save(customer);
    }

}
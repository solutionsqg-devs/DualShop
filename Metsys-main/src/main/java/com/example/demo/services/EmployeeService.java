package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Employee;
import com.example.demo.repository.EmployeeRepository;

@Service
public class EmployeeService implements IEmployeeService{
    @Autowired
    private EmployeeRepository repository;
    
    @Override
    public List<Employee> getAll(){
        return (List<Employee>) repository.findAll();
    }

    @SuppressWarnings("null")
    @Override
    public Employee getById(Long id) {
      return (Employee) repository.findById(id).get();
    }

    @SuppressWarnings("null")
    @Override
    public void remove(Long id) {
        repository.deleteById(id);
    }

    @SuppressWarnings("null")
    @Override
    public void save(Employee employee) {
        repository.save(employee);
    }
}
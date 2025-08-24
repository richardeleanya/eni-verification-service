package com.example.demo.service;

import com.example.demo.dto.EmployerDto;
import com.example.demo.dto.VerificationActionDto;
import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;

public interface EmployerService {
    List<EmployerDto> getAll();
    EmployerDto getById(Long id);
    EmployerDto submit(EmployerDto employerDto);
    EmployerDto verify(Long id, VerificationActionDto actionDto, UserDetails userDetails);
}
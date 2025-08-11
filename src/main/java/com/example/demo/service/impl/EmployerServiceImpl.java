package com.example.demo.service.impl;

import com.example.demo.dto.EmployerDto;
import com.example.demo.dto.VerificationActionDto;
import com.example.demo.model.Employer;
import com.example.demo.model.Employer.VerificationStatus;
import com.example.demo.repository.EmployerRepository;
import com.example.demo.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployerServiceImpl implements EmployerService {

    @Autowired
    private EmployerRepository employerRepository;

    private EmployerDto mapToDto(Employer e) {
        EmployerDto dto = new EmployerDto();
        dto.setId(e.getId());
        dto.setCompanyName(e.getCompanyName());
        dto.setVerificationStatus(e.getVerificationStatus());
        dto.setSubmittedAt(e.getSubmittedAt());
        dto.setVerifiedAt(e.getVerifiedAt());
        return dto;
    }

    private Employer mapToEntity(EmployerDto dto) {
        Employer e = new Employer();
        e.setId(dto.getId());
        e.setCompanyName(dto.getCompanyName());
        e.setVerificationStatus(dto.getVerificationStatus() != null ? dto.getVerificationStatus() : VerificationStatus.PENDING);
        e.setSubmittedAt(dto.getSubmittedAt());
        e.setVerifiedAt(dto.getVerifiedAt());
        return e;
    }

    @Override
    public List<EmployerDto> getAll() {
        return employerRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public EmployerDto getById(Long id) {
        Optional<Employer> employer = employerRepository.findById(id);
        return employer.map(this::mapToDto).orElse(null);
    }

    @Override
    public EmployerDto submit(EmployerDto employerDto) {
        Employer entity = mapToEntity(employerDto);
        entity.setVerificationStatus(VerificationStatus.PENDING);
        entity.setSubmittedAt(Instant.now());
        Employer saved = employerRepository.save(entity);
        return mapToDto(saved);
    }

    @Override
    public EmployerDto verify(Long id, VerificationActionDto actionDto) {
        Employer employer = employerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employer not found"));
        if (actionDto.isVerify()) {
            employer.setVerificationStatus(VerificationStatus.VERIFIED);
            employer.setVerifiedAt(Instant.now());
        } else {
            employer.setVerificationStatus(VerificationStatus.REJECTED);
            employer.setVerifiedAt(Instant.now());
        }
        Employer saved = employerRepository.save(employer);
        return mapToDto(saved);
    }
}
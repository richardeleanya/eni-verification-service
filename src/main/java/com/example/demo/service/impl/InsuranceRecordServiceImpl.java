package com.example.demo.service.impl;

import com.example.demo.dto.InsuranceRecordDto;
import com.example.demo.model.InsuranceRecord;
import com.example.demo.repository.InsuranceRecordRepository;
import com.example.demo.service.InsuranceRecordService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InsuranceRecordServiceImpl implements InsuranceRecordService {

    private final InsuranceRecordRepository insuranceRecordRepository;

    public InsuranceRecordServiceImpl(InsuranceRecordRepository insuranceRecordRepository) {
        this.insuranceRecordRepository = insuranceRecordRepository;
    }

    @Override
    public List<InsuranceRecordDto> getAllInsuranceRecords() {
        return insuranceRecordRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public InsuranceRecordDto getInsuranceRecordById(Long id) {
        InsuranceRecord insuranceRecord = insuranceRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("InsuranceRecord not found"));
        return convertToDto(insuranceRecord);
    }

    @Override
    public InsuranceRecordDto createInsuranceRecord(InsuranceRecordDto insuranceRecordDto) {
        InsuranceRecord insuranceRecord = convertToEntity(insuranceRecordDto);
        insuranceRecord.setSubmittedAt(Instant.now());
        insuranceRecord.setCreatedBy("user");
        insuranceRecord.setCreatedAt(Instant.now());
        InsuranceRecord savedInsuranceRecord = insuranceRecordRepository.save(insuranceRecord);
        return convertToDto(savedInsuranceRecord);
    }

    @Override
    public InsuranceRecordDto verifyInsuranceRecord(Long id) {
        InsuranceRecord insuranceRecord = insuranceRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("InsuranceRecord not found"));
        insuranceRecord.setVerificationStatus(InsuranceRecord.VerificationStatus.VERIFIED);
        insuranceRecord.setVerifiedAt(Instant.now());
        insuranceRecord.setUpdatedBy("user");
        insuranceRecord.setUpdatedAt(Instant.now());
        InsuranceRecord updatedInsuranceRecord = insuranceRecordRepository.save(insuranceRecord);
        return convertToDto(updatedInsuranceRecord);
    }

    private InsuranceRecordDto convertToDto(InsuranceRecord insuranceRecord) {
        InsuranceRecordDto dto = new InsuranceRecordDto();
        dto.setId(insuranceRecord.getId());
        dto.setPolicyHolderName(insuranceRecord.getPolicyHolderName());
        dto.setPolicyNumber(insuranceRecord.getPolicyNumber());
        dto.setPolicyType(insuranceRecord.getPolicyType());
        dto.setCoverageAmount(insuranceRecord.getCoverageAmount());
        dto.setVerificationStatus(insuranceRecord.getVerificationStatus());
        dto.setSubmittedAt(insuranceRecord.getSubmittedAt());
        dto.setVerifiedAt(insuranceRecord.getVerifiedAt());
        dto.setCreatedBy(insuranceRecord.getCreatedBy());
        dto.setCreatedAt(insuranceRecord.getCreatedAt());
        dto.setUpdatedBy(insuranceRecord.getUpdatedBy());
        dto.setUpdatedAt(insuranceRecord.getUpdatedAt());
        return dto;
    }

    private InsuranceRecord convertToEntity(InsuranceRecordDto dto) {
        InsuranceRecord insuranceRecord = new InsuranceRecord();
        insuranceRecord.setPolicyHolderName(dto.getPolicyHolderName());
        insuranceRecord.setPolicyNumber(dto.getPolicyNumber());
        insuranceRecord.setPolicyType(dto.getPolicyType());
        insuranceRecord.setCoverageAmount(dto.getCoverageAmount());
        return insuranceRecord;
    }
}

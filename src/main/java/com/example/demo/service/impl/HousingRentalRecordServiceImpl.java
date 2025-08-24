package com.example.demo.service.impl;

import com.example.demo.dto.HousingRentalRecordDto;
import com.example.demo.model.HousingRentalRecord;
import com.example.demo.repository.HousingRentalRecordRepository;
import com.example.demo.service.HousingRentalRecordService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HousingRentalRecordServiceImpl implements HousingRentalRecordService {

    private final HousingRentalRecordRepository housingRentalRecordRepository;

    public HousingRentalRecordServiceImpl(HousingRentalRecordRepository housingRentalRecordRepository) {
        this.housingRentalRecordRepository = housingRentalRecordRepository;
    }

    @Override
    public List<HousingRentalRecordDto> getAllHousingRentalRecords() {
        return housingRentalRecordRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public HousingRentalRecordDto getHousingRentalRecordById(Long id) {
        HousingRentalRecord housingRentalRecord = housingRentalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("HousingRentalRecord not found"));
        return convertToDto(housingRentalRecord);
    }

    @Override
    public HousingRentalRecordDto createHousingRentalRecord(HousingRentalRecordDto housingRentalRecordDto) {
        HousingRentalRecord housingRentalRecord = convertToEntity(housingRentalRecordDto);
        housingRentalRecord.setSubmittedAt(Instant.now());
        housingRentalRecord.setCreatedBy("user");
        housingRentalRecord.setCreatedAt(Instant.now());
        HousingRentalRecord savedHousingRentalRecord = housingRentalRecordRepository.save(housingRentalRecord);
        return convertToDto(savedHousingRentalRecord);
    }

    @Override
    public HousingRentalRecordDto verifyHousingRentalRecord(Long id) {
        HousingRentalRecord housingRentalRecord = housingRentalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("HousingRentalRecord not found"));
        housingRentalRecord.setVerificationStatus(HousingRentalRecord.VerificationStatus.VERIFIED);
        housingRentalRecord.setVerifiedAt(Instant.now());
        housingRentalRecord.setUpdatedBy("user");
        housingRentalRecord.setUpdatedAt(Instant.now());
        HousingRentalRecord updatedHousingRentalRecord = housingRentalRecordRepository.save(housingRentalRecord);
        return convertToDto(updatedHousingRentalRecord);
    }

    private HousingRentalRecordDto convertToDto(HousingRentalRecord housingRentalRecord) {
        HousingRentalRecordDto dto = new HousingRentalRecordDto();
        dto.setId(housingRentalRecord.getId());
        dto.setTenantName(housingRentalRecord.getTenantName());
        dto.setPropertyAddress(housingRentalRecord.getPropertyAddress());
        dto.setLeaseStartDate(housingRentalRecord.getLeaseStartDate());
        dto.setLeaseEndDate(housingRentalRecord.getLeaseEndDate());
        dto.setRentAmount(housingRentalRecord.getRentAmount());
        dto.setVerificationStatus(housingRentalRecord.getVerificationStatus());
        dto.setSubmittedAt(housingRentalRecord.getSubmittedAt());
        dto.setVerifiedAt(housingRentalRecord.getVerifiedAt());
        dto.setCreatedBy(housingRentalRecord.getCreatedBy());
        dto.setCreatedAt(housingRentalRecord.getCreatedAt());
        dto.setUpdatedBy(housingRentalRecord.getUpdatedBy());
        dto.setUpdatedAt(housingRentalRecord.getUpdatedAt());
        return dto;
    }

    private HousingRentalRecord convertToEntity(HousingRentalRecordDto dto) {
        HousingRentalRecord housingRentalRecord = new HousingRentalRecord();
        housingRentalRecord.setTenantName(dto.getTenantName());
        housingRentalRecord.setPropertyAddress(dto.getPropertyAddress());
        housingRentalRecord.setLeaseStartDate(dto.getLeaseStartDate());
        housingRentalRecord.setLeaseEndDate(dto.getLeaseEndDate());
        housingRentalRecord.setRentAmount(dto.getRentAmount());
        return housingRentalRecord;
    }
}

package com.example.demo.service.impl;

import com.example.demo.dto.EducationRecordDto;
import com.example.demo.model.EducationRecord;
import com.example.demo.repository.EducationRecordRepository;
import com.example.demo.service.EducationRecordService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EducationRecordServiceImpl implements EducationRecordService {

    private final EducationRecordRepository educationRecordRepository;

    public EducationRecordServiceImpl(EducationRecordRepository educationRecordRepository) {
        this.educationRecordRepository = educationRecordRepository;
    }

    @Override
    public List<EducationRecordDto> getAllEducationRecords() {
        return educationRecordRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public EducationRecordDto getEducationRecordById(Long id) {
        EducationRecord educationRecord = educationRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("EducationRecord not found"));
        return convertToDto(educationRecord);
    }

    @Override
    public EducationRecordDto createEducationRecord(EducationRecordDto educationRecordDto) {
        EducationRecord educationRecord = convertToEntity(educationRecordDto);
        educationRecord.setSubmittedAt(Instant.now());
        // In a real app, you'd get the current user from security context
        educationRecord.setCreatedBy("user");
        educationRecord.setCreatedAt(Instant.now());
        EducationRecord savedEducationRecord = educationRecordRepository.save(educationRecord);
        return convertToDto(savedEducationRecord);
    }

    @Override
    public EducationRecordDto verifyEducationRecord(Long id) {
        EducationRecord educationRecord = educationRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("EducationRecord not found"));
        educationRecord.setVerificationStatus(EducationRecord.VerificationStatus.VERIFIED);
        educationRecord.setVerifiedAt(Instant.now());
        // In a real app, you'd get the current user from security context
        educationRecord.setUpdatedBy("user");
        educationRecord.setUpdatedAt(Instant.now());
        EducationRecord updatedEducationRecord = educationRecordRepository.save(educationRecord);
        return convertToDto(updatedEducationRecord);
    }

    private EducationRecordDto convertToDto(EducationRecord educationRecord) {
        EducationRecordDto dto = new EducationRecordDto();
        dto.setId(educationRecord.getId());
        dto.setStudentName(educationRecord.getStudentName());
        dto.setInstitution(educationRecord.getInstitution());
        dto.setQualification(educationRecord.getQualification());
        dto.setConferralDate(educationRecord.getConferralDate());
        dto.setVerificationStatus(educationRecord.getVerificationStatus());
        dto.setSubmittedAt(educationRecord.getSubmittedAt());
        dto.setVerifiedAt(educationRecord.getVerifiedAt());
        dto.setCreatedBy(educationRecord.getCreatedBy());
        dto.setCreatedAt(educationRecord.getCreatedAt());
        dto.setUpdatedBy(educationRecord.getUpdatedBy());
        dto.setUpdatedAt(educationRecord.getUpdatedAt());
        return dto;
    }

    private EducationRecord convertToEntity(EducationRecordDto dto) {
        EducationRecord educationRecord = new EducationRecord();
        educationRecord.setStudentName(dto.getStudentName());
        educationRecord.setInstitution(dto.getInstitution());
        educationRecord.setQualification(dto.getQualification());
        educationRecord.setConferralDate(dto.getConferralDate());
        // Set other fields from DTO if necessary
        return educationRecord;
    }
}

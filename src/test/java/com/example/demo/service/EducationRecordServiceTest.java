package com.example.demo.service;

import com.example.demo.dto.EducationRecordDto;
import com.example.demo.model.EducationRecord;
import com.example.demo.repository.EducationRecordRepository;
import com.example.demo.service.impl.EducationRecordServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class EducationRecordServiceTest {

    @Mock
    private EducationRecordRepository educationRecordRepository;

    @InjectMocks
    private EducationRecordServiceImpl educationRecordService;

    private EducationRecord educationRecord;
    private EducationRecordDto educationRecordDto;

    @BeforeEach
    void setUp() {
        educationRecord = new EducationRecord();
        educationRecord.setId(1L);
        educationRecord.setStudentName("John Doe");
        educationRecord.setInstitution("University of Spring");
        educationRecord.setQualification("BSc Computer Science");
        educationRecord.setConferralDate(LocalDate.of(2023, 5, 20));
        educationRecord.setVerificationStatus(EducationRecord.VerificationStatus.PENDING);

        educationRecordDto = new EducationRecordDto();
        educationRecordDto.setId(1L);
        educationRecordDto.setStudentName("John Doe");
        educationRecordDto.setInstitution("University of Spring");
        educationRecordDto.setQualification("BSc Computer Science");
        educationRecordDto.setConferralDate(LocalDate.of(2023, 5, 20));
        educationRecordDto.setVerificationStatus(EducationRecord.VerificationStatus.PENDING);
    }

    @Test
    void testGetAllEducationRecords() {
        when(educationRecordRepository.findAll()).thenReturn(Collections.singletonList(educationRecord));
        List<EducationRecordDto> result = educationRecordService.getAllEducationRecords();
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("John Doe", result.get(0).getStudentName());
    }

    @Test
    void testGetEducationRecordById() {
        when(educationRecordRepository.findById(1L)).thenReturn(Optional.of(educationRecord));
        EducationRecordDto result = educationRecordService.getEducationRecordById(1L);
        assertNotNull(result);
        assertEquals("John Doe", result.getStudentName());
    }

    @Test
    void testCreateEducationRecord() {
        when(educationRecordRepository.save(any(EducationRecord.class))).thenReturn(educationRecord);
        EducationRecordDto result = educationRecordService.createEducationRecord(educationRecordDto);
        assertNotNull(result);
        assertEquals("John Doe", result.getStudentName());
    }

    @Test
    void testVerifyEducationRecord() {
        when(educationRecordRepository.findById(1L)).thenReturn(Optional.of(educationRecord));
        when(educationRecordRepository.save(any(EducationRecord.class))).thenReturn(educationRecord);
        EducationRecordDto result = educationRecordService.verifyEducationRecord(1L);
        assertNotNull(result);
        assertEquals(EducationRecord.VerificationStatus.VERIFIED, result.getVerificationStatus());
    }
}

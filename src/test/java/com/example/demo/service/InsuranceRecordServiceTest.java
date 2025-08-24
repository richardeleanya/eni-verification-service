package com.example.demo.service;

import com.example.demo.dto.InsuranceRecordDto;
import com.example.demo.model.InsuranceRecord;
import com.example.demo.repository.InsuranceRecordRepository;
import com.example.demo.service.impl.InsuranceRecordServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class InsuranceRecordServiceTest {

    @Mock
    private InsuranceRecordRepository insuranceRecordRepository;

    @InjectMocks
    private InsuranceRecordServiceImpl insuranceRecordService;

    private InsuranceRecord insuranceRecord;
    private InsuranceRecordDto insuranceRecordDto;

    @BeforeEach
    void setUp() {
        insuranceRecord = new InsuranceRecord();
        insuranceRecord.setId(1L);
        insuranceRecord.setPolicyHolderName("John Doe");
        insuranceRecord.setPolicyNumber("POL-12345");
        insuranceRecord.setPolicyType("AUTO");
        insuranceRecord.setCoverageAmount(new BigDecimal("50000.00"));
        insuranceRecord.setVerificationStatus(InsuranceRecord.VerificationStatus.PENDING);

        insuranceRecordDto = new InsuranceRecordDto();
        insuranceRecordDto.setId(1L);
        insuranceRecordDto.setPolicyHolderName("John Doe");
        insuranceRecordDto.setPolicyNumber("POL-12345");
        insuranceRecordDto.setPolicyType("AUTO");
        insuranceRecordDto.setCoverageAmount(new BigDecimal("50000.00"));
        insuranceRecordDto.setVerificationStatus(InsuranceRecord.VerificationStatus.PENDING);
    }

    @Test
    void testGetAllInsuranceRecords() {
        when(insuranceRecordRepository.findAll()).thenReturn(Collections.singletonList(insuranceRecord));
        List<InsuranceRecordDto> result = insuranceRecordService.getAllInsuranceRecords();
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("John Doe", result.get(0).getPolicyHolderName());
    }

    @Test
    void testGetInsuranceRecordById() {
        when(insuranceRecordRepository.findById(1L)).thenReturn(Optional.of(insuranceRecord));
        InsuranceRecordDto result = insuranceRecordService.getInsuranceRecordById(1L);
        assertNotNull(result);
        assertEquals("John Doe", result.getPolicyHolderName());
    }

    @Test
    void testCreateInsuranceRecord() {
        when(insuranceRecordRepository.save(any(InsuranceRecord.class))).thenReturn(insuranceRecord);
        InsuranceRecordDto result = insuranceRecordService.createInsuranceRecord(insuranceRecordDto);
        assertNotNull(result);
        assertEquals("John Doe", result.getPolicyHolderName());
    }

    @Test
    void testVerifyInsuranceRecord() {
        when(insuranceRecordRepository.findById(1L)).thenReturn(Optional.of(insuranceRecord));
        when(insuranceRecordRepository.save(any(InsuranceRecord.class))).thenReturn(insuranceRecord);
        InsuranceRecordDto result = insuranceRecordService.verifyInsuranceRecord(1L);
        assertNotNull(result);
        assertEquals(InsuranceRecord.VerificationStatus.VERIFIED, result.getVerificationStatus());
    }
}

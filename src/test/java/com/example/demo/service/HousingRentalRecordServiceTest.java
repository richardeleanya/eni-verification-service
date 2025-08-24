package com.example.demo.service;

import com.example.demo.dto.HousingRentalRecordDto;
import com.example.demo.model.HousingRentalRecord;
import com.example.demo.repository.HousingRentalRecordRepository;
import com.example.demo.service.impl.HousingRentalRecordServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class HousingRentalRecordServiceTest {

    @Mock
    private HousingRentalRecordRepository housingRentalRecordRepository;

    @InjectMocks
    private HousingRentalRecordServiceImpl housingRentalRecordService;

    private HousingRentalRecord housingRentalRecord;
    private HousingRentalRecordDto housingRentalRecordDto;

    @BeforeEach
    void setUp() {
        housingRentalRecord = new HousingRentalRecord();
        housingRentalRecord.setId(1L);
        housingRentalRecord.setTenantName("John Doe");
        housingRentalRecord.setPropertyAddress("123 Main St");
        housingRentalRecord.setLeaseStartDate(LocalDate.of(2023, 1, 1));
        housingRentalRecord.setLeaseEndDate(LocalDate.of(2023, 12, 31));
        housingRentalRecord.setRentAmount(new BigDecimal("1200.00"));
        housingRentalRecord.setVerificationStatus(HousingRentalRecord.VerificationStatus.PENDING);

        housingRentalRecordDto = new HousingRentalRecordDto();
        housingRentalRecordDto.setId(1L);
        housingRentalRecordDto.setTenantName("John Doe");
        housingRentalRecordDto.setPropertyAddress("123 Main St");
        housingRentalRecordDto.setLeaseStartDate(LocalDate.of(2023, 1, 1));
        housingRentalRecordDto.setLeaseEndDate(LocalDate.of(2023, 12, 31));
        housingRentalRecordDto.setRentAmount(new BigDecimal("1200.00"));
        housingRentalRecordDto.setVerificationStatus(HousingRentalRecord.VerificationStatus.PENDING);
    }

    @Test
    void testGetAllHousingRentalRecords() {
        when(housingRentalRecordRepository.findAll()).thenReturn(Collections.singletonList(housingRentalRecord));
        List<HousingRentalRecordDto> result = housingRentalRecordService.getAllHousingRentalRecords();
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("John Doe", result.get(0).getTenantName());
    }

    @Test
    void testGetHousingRentalRecordById() {
        when(housingRentalRecordRepository.findById(1L)).thenReturn(Optional.of(housingRentalRecord));
        HousingRentalRecordDto result = housingRentalRecordService.getHousingRentalRecordById(1L);
        assertNotNull(result);
        assertEquals("John Doe", result.getTenantName());
    }

    @Test
    void testCreateHousingRentalRecord() {
        when(housingRentalRecordRepository.save(any(HousingRentalRecord.class))).thenReturn(housingRentalRecord);
        HousingRentalRecordDto result = housingRentalRecordService.createHousingRentalRecord(housingRentalRecordDto);
        assertNotNull(result);
        assertEquals("John Doe", result.getTenantName());
    }

    @Test
    void testVerifyHousingRentalRecord() {
        when(housingRentalRecordRepository.findById(1L)).thenReturn(Optional.of(housingRentalRecord));
        when(housingRentalRecordRepository.save(any(HousingRentalRecord.class))).thenReturn(housingRentalRecord);
        HousingRentalRecordDto result = housingRentalRecordService.verifyHousingRentalRecord(1L);
        assertNotNull(result);
        assertEquals(HousingRentalRecord.VerificationStatus.VERIFIED, result.getVerificationStatus());
    }
}

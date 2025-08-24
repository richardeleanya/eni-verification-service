package com.example.demo.service;

import com.example.demo.dto.InsuranceRecordDto;
import java.util.List;

public interface InsuranceRecordService {
    List<InsuranceRecordDto> getAllInsuranceRecords();
    InsuranceRecordDto getInsuranceRecordById(Long id);
    InsuranceRecordDto createInsuranceRecord(InsuranceRecordDto insuranceRecordDto);
    InsuranceRecordDto verifyInsuranceRecord(Long id);
}

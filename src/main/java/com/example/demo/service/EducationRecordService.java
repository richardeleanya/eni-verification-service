package com.example.demo.service;

import com.example.demo.dto.EducationRecordDto;
import java.util.List;

public interface EducationRecordService {
    List<EducationRecordDto> getAllEducationRecords();
    EducationRecordDto getEducationRecordById(Long id);
    EducationRecordDto createEducationRecord(EducationRecordDto educationRecordDto);
    EducationRecordDto verifyEducationRecord(Long id);
}

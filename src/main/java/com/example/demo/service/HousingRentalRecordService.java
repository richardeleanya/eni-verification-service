package com.example.demo.service;

import com.example.demo.dto.HousingRentalRecordDto;
import java.util.List;

public interface HousingRentalRecordService {
    List<HousingRentalRecordDto> getAllHousingRentalRecords();
    HousingRentalRecordDto getHousingRentalRecordById(Long id);
    HousingRentalRecordDto createHousingRentalRecord(HousingRentalRecordDto housingRentalRecordDto);
    HousingRentalRecordDto verifyHousingRentalRecord(Long id);
}

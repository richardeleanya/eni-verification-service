package com.example.demo.controller;

import com.example.demo.dto.HousingRentalRecordDto;
import com.example.demo.service.HousingRentalRecordService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/integrations/housing-rental")
@PreAuthorize("hasRole('USER')")
public class IntegrationHousingRentalController {

    private final HousingRentalRecordService housingRentalRecordService;

    public IntegrationHousingRentalController(HousingRentalRecordService housingRentalRecordService) {
        this.housingRentalRecordService = housingRentalRecordService;
    }

    @GetMapping
    public ResponseEntity<List<HousingRentalRecordDto>> getAllHousingRentalRecords() {
        return ResponseEntity.ok(housingRentalRecordService.getAllHousingRentalRecords());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HousingRentalRecordDto> getHousingRentalRecordById(@PathVariable Long id) {
        return ResponseEntity.ok(housingRentalRecordService.getHousingRentalRecordById(id));
    }

    @PostMapping
    public ResponseEntity<HousingRentalRecordDto> createHousingRentalRecord(@RequestBody HousingRentalRecordDto housingRentalRecordDto) {
        HousingRentalRecordDto createdRecord = housingRentalRecordService.createHousingRentalRecord(housingRentalRecordDto);
        return ResponseEntity.ok(createdRecord);
    }

    @PostMapping("/{id}/verify")
    public ResponseEntity<HousingRentalRecordDto> verifyHousingRentalRecord(@PathVariable Long id) {
        HousingRentalRecordDto verifiedRecord = housingRentalRecordService.verifyHousingRentalRecord(id);
        return ResponseEntity.ok(verifiedRecord);
    }
}

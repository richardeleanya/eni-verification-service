package com.example.demo.controller;

import com.example.demo.dto.InsuranceRecordDto;
import com.example.demo.service.InsuranceRecordService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/integrations/insurance")
@PreAuthorize("hasRole('USER')")
public class IntegrationInsuranceController {

    private final InsuranceRecordService insuranceRecordService;

    public IntegrationInsuranceController(InsuranceRecordService insuranceRecordService) {
        this.insuranceRecordService = insuranceRecordService;
    }

    @GetMapping
    public ResponseEntity<List<InsuranceRecordDto>> getAllInsuranceRecords() {
        return ResponseEntity.ok(insuranceRecordService.getAllInsuranceRecords());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InsuranceRecordDto> getInsuranceRecordById(@PathVariable Long id) {
        return ResponseEntity.ok(insuranceRecordService.getInsuranceRecordById(id));
    }

    @PostMapping
    public ResponseEntity<InsuranceRecordDto> createInsuranceRecord(@RequestBody InsuranceRecordDto insuranceRecordDto) {
        InsuranceRecordDto createdRecord = insuranceRecordService.createInsuranceRecord(insuranceRecordDto);
        return ResponseEntity.ok(createdRecord);
    }

    @PostMapping("/{id}/verify")
    public ResponseEntity<InsuranceRecordDto> verifyInsuranceRecord(@PathVariable Long id) {
        InsuranceRecordDto verifiedRecord = insuranceRecordService.verifyInsuranceRecord(id);
        return ResponseEntity.ok(verifiedRecord);
    }
}

package com.example.demo.controller;

import com.example.demo.dto.EducationRecordDto;
import com.example.demo.service.EducationRecordService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/integrations/education")
@PreAuthorize("hasRole('USER')")
public class IntegrationEducationController {

    private final EducationRecordService educationRecordService;

    public IntegrationEducationController(EducationRecordService educationRecordService) {
        this.educationRecordService = educationRecordService;
    }

    @GetMapping
    public ResponseEntity<List<EducationRecordDto>> getAllEducationRecords() {
        return ResponseEntity.ok(educationRecordService.getAllEducationRecords());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EducationRecordDto> getEducationRecordById(@PathVariable Long id) {
        return ResponseEntity.ok(educationRecordService.getEducationRecordById(id));
    }

    @PostMapping
    public ResponseEntity<EducationRecordDto> createEducationRecord(@RequestBody EducationRecordDto educationRecordDto) {
        EducationRecordDto createdRecord = educationRecordService.createEducationRecord(educationRecordDto);
        return ResponseEntity.ok(createdRecord);
    }

    @PostMapping("/{id}/verify")
    public ResponseEntity<EducationRecordDto> verifyEducationRecord(@PathVariable Long id) {
        EducationRecordDto verifiedRecord = educationRecordService.verifyEducationRecord(id);
        return ResponseEntity.ok(verifiedRecord);
    }
}

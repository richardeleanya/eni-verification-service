package com.example.demo.controller;

import com.example.demo.dto.PoliceRecordDto;
import com.example.demo.payload.PoliceRecordResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/police")
@Tag(name = "Police Services", description = "Police record endpoints (stub)")
public class IntegrationPoliceController {

    @GetMapping
    @Operation(summary = "List police records (stub data)")
    public List<PoliceRecordResponse> list() {
        List<PoliceRecordResponse> records = new ArrayList<>();
        records.add(sampleRecord(1L));
        records.add(sampleRecord(2L));
        return records;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get police record by id (stub)")
    public PoliceRecordResponse get(@PathVariable Long id) {
        return sampleRecord(id);
    }

    private PoliceRecordResponse sampleRecord(Long id) {
        PoliceRecordResponse resp = new PoliceRecordResponse();
        resp.setId(id);
        resp.setCaseId("CASE-" + String.format("%04d", id));
        resp.setStatus(id % 2 == 0 ? "Closed" : "Active");
        resp.setReportedAt(Instant.now().minusSeconds(id * 86400));
        return resp;
    }
}
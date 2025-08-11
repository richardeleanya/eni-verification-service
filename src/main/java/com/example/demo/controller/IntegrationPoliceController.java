package com.example.demo.controller;

import com.example.demo.model.PoliceRecord;
import com.example.demo.service.PoliceRecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/police")
@Tag(name = "Police Services", description = "Police record endpoints")
public class IntegrationPoliceController {

    @Autowired
    private PoliceRecordService policeRecordService;

    @GetMapping
    @Operation(summary = "List police records (real data)")
    public List<PoliceRecord> list() {
        return policeRecordService.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get police record by id (real data)")
    public PoliceRecord get(@PathVariable Long id) {
        return policeRecordService.getById(id);
    }
}
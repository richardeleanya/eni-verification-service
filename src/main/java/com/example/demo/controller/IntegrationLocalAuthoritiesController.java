package com.example.demo.controller;

import com.example.demo.model.LocalAuthorityRecord;
import com.example.demo.service.LocalAuthorityRecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/local-authorities")
@Tag(name = "Local Authorities", description = "Local Authorities records endpoints")
public class IntegrationLocalAuthoritiesController {

    @Autowired
    private LocalAuthorityRecordService recordService;

    @GetMapping
    @Operation(summary = "List Local Authorities records (real data)")
    public List<LocalAuthorityRecord> list() {
        return recordService.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Local Authorities record by id (real data)")
    public LocalAuthorityRecord get(@PathVariable Long id) {
        return recordService.getById(id);
    }
}
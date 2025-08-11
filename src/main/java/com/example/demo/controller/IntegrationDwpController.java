package com.example.demo.controller;

import com.example.demo.model.DwpApplication;
import com.example.demo.service.DwpApplicationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dwp")
@Tag(name = "DWP", description = "DWP application endpoints")
public class IntegrationDwpController {

    @Autowired
    private DwpApplicationService dwpApplicationService;

    @GetMapping
    @Operation(summary = "List DWP applications (real data)")
    public List<DwpApplication> list() {
        return dwpApplicationService.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get DWP application by id (real data)")
    public DwpApplication get(@PathVariable Long id) {
        return dwpApplicationService.getById(id);
    }
}
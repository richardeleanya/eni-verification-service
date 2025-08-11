package com.example.demo.controller;

import com.example.demo.model.HmrcCase;
import com.example.demo.service.HmrcCaseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hmrc")
@Tag(name = "HMRC", description = "HMRC case endpoints")
public class IntegrationHmrcController {

    @Autowired
    private HmrcCaseService hmrcCaseService;

    @GetMapping
    @Operation(summary = "List HMRC cases (real data)")
    public List<HmrcCase> list() {
        return hmrcCaseService.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get HMRC case by id (real data)")
    public HmrcCase get(@PathVariable Long id) {
        return hmrcCaseService.getById(id);
    }
}
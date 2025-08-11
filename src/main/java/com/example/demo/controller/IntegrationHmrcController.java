package com.example.demo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hmrc")
@Tag(name = "HMRC", description = "HMRC case endpoints (stub)")
public class IntegrationHmrcController {

    @GetMapping
    @Operation(summary = "List HMRC cases (stub data)")
    public List<Map<String, Object>> list() {
        List<Map<String, Object>> cases = new ArrayList<>();
        cases.add(sampleCase(1L));
        cases.add(sampleCase(2L));
        return cases;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get HMRC case by id (stub)")
    public Map<String, Object> get(@PathVariable Long id) {
        return sampleCase(id);
    }

    private Map<String, Object> sampleCase(Long id) {
        return Map.of(
                "id", id,
                "status", id % 2 == 0 ? "Closed" : "Active",
                "date", Instant.now().minusSeconds(id * 86400).toString()
        );
    }
}
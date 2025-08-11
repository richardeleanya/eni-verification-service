package com.example.demo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/education")
@Tag(name = "Education", description = "Education records endpoints (stub)")
public class IntegrationEducationController {
    @GetMapping
    @Operation(summary = "List Education records (stub data)")
    public List<Map<String, Object>> list() {
        List<Map<String, Object>> result = new ArrayList<>();
        result.add(stubRec(1L));
        result.add(stubRec(2L));
        return result;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Education record by id (stub)")
    public Map<String, Object> get(@PathVariable Long id) {
        return stubRec(id);
    }

    private Map<String, Object> stubRec(Long id) {
        return Map.of(
                "id", id,
                "studentId", "STU-" + String.format("%06d", id),
                "status", id % 2 == 0 ? "Verified" : "Pending",
                "date", Instant.now().minusSeconds(id * 86400).toString()
        );
    }
}
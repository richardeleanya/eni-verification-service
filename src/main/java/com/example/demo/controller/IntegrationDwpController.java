package com.example.demo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dwp")
@Tag(name = "DWP", description = "DWP application endpoints (stub)")
public class IntegrationDwpController {

    @GetMapping
    @Operation(summary = "List DWP applications (stub data)")
    public List<Map<String, Object>> list() {
        List<Map<String, Object>> result = new ArrayList<>();
        result.add(stubApp(1L));
        result.add(stubApp(2L));
        return result;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get DWP application by id (stub)")
    public Map<String, Object> get(@PathVariable Long id) {
        return stubApp(id);
    }

    private Map<String, Object> stubApp(Long id) {
        return Map.of(
                "id", id,
                "applicationId", "APP-" + String.format("%05d", id),
                "status", id % 2 == 0 ? "Closed" : "Active",
                "date", Instant.now().minusSeconds(id * 86400).toString()
        );
    }
}
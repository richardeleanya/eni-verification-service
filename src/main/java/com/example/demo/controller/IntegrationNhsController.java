package com.example.demo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/nhs")
@Tag(name = "NHS", description = "NHS appointment endpoints (stub)")
public class IntegrationNhsController {

    @GetMapping
    @Operation(summary = "List NHS appointments (stub data)")
    public List<Map<String, Object>> list() {
        List<Map<String, Object>> result = new ArrayList<>();
        result.add(stubApp(1L));
        result.add(stubApp(2L));
        return result;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get NHS appointment by id (stub)")
    public Map<String, Object> get(@PathVariable Long id) {
        return stubApp(id);
    }

    private Map<String, Object> stubApp(Long id) {
        return Map.of(
                "id", id,
                "appointmentId", "APT-" + String.format("%05d", id),
                "status", id % 2 == 0 ? "Completed" : "Scheduled",
                "date", Instant.now().minusSeconds(id * 86400).toString()
        );
    }
}
package com.example.demo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/financial-services")
@Tag(name = "Financial Services", description = "Financial records endpoints (stub)")
public class IntegrationFinancialServicesController {
    @GetMapping
    @Operation(summary = "List Financial transactions (stub data)")
    public List<Map<String, Object>> list() {
        List<Map<String, Object>> result = new ArrayList<>();
        result.add(stubRec(1L));
        result.add(stubRec(2L));
        return result;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Financial transaction by id (stub)")
    public Map<String, Object> get(@PathVariable Long id) {
        return stubRec(id);
    }

    private Map<String, Object> stubRec(Long id) {
        return Map.of(
                "id", id,
                "transactionId", "TXN-" + String.format("%06d", id),
                "status", id % 2 == 0 ? "Completed" : "Pending",
                "date", Instant.now().minusSeconds(id * 86400).toString()
        );
    }
}
package com.example.demo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/retail")
@Tag(name = "Retail & E-Commerce", description = "Retail & E-Commerce transaction endpoints (stub)")
public class IntegrationRetailController {
    @GetMapping
    @Operation(summary = "List Retail transactions (stub data)")
    public List<Map<String, Object>> list() {
        List<Map<String, Object>> result = new ArrayList<>();
        result.add(stubRec(1L));
        result.add(stubRec(2L));
        return result;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Retail transaction by id (stub)")
    public Map<String, Object> get(@PathVariable Long id) {
        return stubRec(id);
    }

    private Map<String, Object> stubRec(Long id) {
        return Map.of(
                "id", id,
                "transactionId", "RET-" + String.format("%06d", id),
                "status", id % 2 == 0 ? "Completed" : "Pending",
                "date", Instant.now().minusSeconds(id * 86400).toString()
        );
    }
}
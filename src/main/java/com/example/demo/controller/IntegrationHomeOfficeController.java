package com.example.demo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/home-office/applications")
@Tag(name = "Home Office Visa Applications", description = "Visa application endpoints (stub)")
public class IntegrationHomeOfficeController {

    @GetMapping
    @Operation(summary = "List visa applications (stub data)")
    public List<Map<String, Object>> list(
            @RequestParam(value = "q", required = false) String q
    ) {
        List<Map<String, Object>> out = new ArrayList<>();
        out.add(stubApplication(1001L, "Aliya Khan", "Pending"));
        out.add(stubApplication(1002L, "John Doe", "Approved"));
        out.add(stubApplication(1003L, "Maria Silva", "Rejected"));
        if (q == null || q.isBlank()) {
            return out;
        }
        String query = q.trim().toLowerCase();
        List<Map<String, Object>> filtered = new ArrayList<>();
        for (Map<String, Object> app : out) {
            String name = ((String) app.get("applicantName")).toLowerCase();
            String idStr = app.get("id").toString();
            if (name.contains(query) || idStr.equals(query)) {
                filtered.add(app);
            }
        }
        return filtered;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get visa application by id (stub)")
    public Map<String, Object> get(@PathVariable Long id) {
        String name = id == 1001L ? "Aliya Khan" : id == 1002L ? "John Doe" : "Maria Silva";
        String status = id == 1001L ? "Pending" : id == 1002L ? "Approved" : "Rejected";
        Map<String, Object> app = stubApplication(id, name, status);
        app.put("details", "Sample details for " + name);
        return app;
    }

    private Map<String, Object> stubApplication(Long id, String applicantName, String status) {
        return Map.of(
                "id", id,
                "applicantName", applicantName,
                "status", status,
                "submittedAt", Instant.now().minusSeconds(id * 10000).toString()
        );
    }
}
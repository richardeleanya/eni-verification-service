package com.example.demo.controller;

import com.example.demo.dto.EmployerDto;
import com.example.demo.dto.VerificationActionDto;
import com.example.demo.payload.EmployerRequest;
import com.example.demo.payload.EmployerResponse;
import com.example.demo.payload.VerificationRequest;
import com.example.demo.payload.VerificationResponse;
import com.example.demo.service.EmployerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.time.Instant;
import java.util.ArrayList;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/employers")
@Tag(name = "Employers", description = "Employer verification endpoints")
public class EmployerController {

    @Autowired
    private EmployerService employerService;

    @GetMapping
    @Operation(summary = "List all employers")
    public List<EmployerResponse> getAll() {
        return employerService.getAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get employer by ID")
    public EmployerResponse getById(@PathVariable Long id) {
        return toResponse(employerService.getById(id));
    }

    @PostMapping
    @Operation(summary = "Submit new employer for verification")
    public EmployerResponse submit(@RequestBody EmployerRequest req) {
        EmployerDto dto = new EmployerDto();
        dto.setCompanyName(req.getCompanyName());
        return toResponse(employerService.submit(dto));
    }

    @PostMapping("/{id}/verify")
    @Operation(summary = "Verify or reject employer")
    public VerificationResponse verify(@PathVariable Long id, @RequestBody VerificationRequest req, @AuthenticationPrincipal UserDetails userDetails) {
        VerificationActionDto actionDto = new VerificationActionDto();
        actionDto.setVerify(req.isVerify());
        actionDto.setReviewer(req.getReviewer());
        var dto = employerService.verify(id, actionDto, userDetails);
        VerificationResponse resp = new VerificationResponse();
        resp.setEmployerId(dto.getId());
        resp.setNewStatus(dto.getVerificationStatus());
        resp.setVerifiedAt(dto.getVerifiedAt());
        return resp;
    }

    private EmployerResponse toResponse(EmployerDto dto) {
        EmployerResponse resp = new EmployerResponse();
        resp.setId(dto.getId());
        resp.setCompanyName(dto.getCompanyName());
        resp.setVerificationStatus(dto.getVerificationStatus());
        resp.setSubmittedAt(dto.getSubmittedAt());
        resp.setVerifiedAt(dto.getVerifiedAt());
        return resp;
    }

    @GetMapping("/{id}/audit")
    @Operation(summary = "Get audit trail for employer (stub)")
    public List<Map<String, Object>> getAuditTrail(@PathVariable Long id) {
        Instant now = Instant.now();
        List<Map<String, Object>> audit = new ArrayList<>();
        audit.add(Map.of(
                "action", "CREATED",
                "by", "system",
                "at", now
        ));
        audit.add(Map.of(
                "action", "VERIFIED",
                "by", "admin",
                "at", now.plusSeconds(3600)
        ));
        return audit;
    }
}
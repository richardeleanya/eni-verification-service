package com.example.demo.controller;

import com.example.demo.dto.AuditLogDto;
import com.example.demo.model.AuditLog;
import com.example.demo.service.AuditLogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/audit")
@Tag(name = "Audit", description = "Audit trail API for all domains")
public class AuditController {

    @Autowired
    private AuditLogService auditLogService;

    @GetMapping
    @Operation(
            summary = "Get paginated audit logs for a domain/entity",
            description = "Returns a paginated list of audit logs for the given domain and entityId"
    )
    public Page<AuditLogDto> getAuditLogs(
            @Parameter(description = "Domain key, e.g. 'employer', 'police', etc.") @RequestParam String domain,
            @Parameter(description = "Entity id") @RequestParam Long entityId,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Page<AuditLog> result = auditLogService.findByDomainAndEntityId(domain, entityId, pageable);
        List<AuditLogDto> dtos = result.stream().map(this::toDto).collect(Collectors.toList());
        return new PageImpl<>(dtos, pageable, result.getTotalElements());
    }

    private AuditLogDto toDto(AuditLog log) {
        AuditLogDto dto = new AuditLogDto();
        dto.setId(log.getId());
        dto.setDomain(log.getDomain());
        dto.setEntityId(log.getEntityId());
        dto.setAction(log.getAction());
        dto.setPerformedBy(log.getPerformedBy());
        dto.setTimestamp(log.getTimestamp());
        return dto;
    }
}
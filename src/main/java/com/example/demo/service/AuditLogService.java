package com.example.demo.service;

import com.example.demo.model.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AuditLogService {
    Page<AuditLog> findByDomainAndEntityId(String domain, Long entityId, Pageable pageable);
}
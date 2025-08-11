package com.example.demo.service.impl;

import com.example.demo.model.AuditLog;
import com.example.demo.repository.AuditLogRepository;
import com.example.demo.service.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AuditLogServiceImpl implements AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Override
    public Page<AuditLog> findByDomainAndEntityId(String domain, Long entityId, Pageable pageable) {
        return auditLogRepository.findByDomainAndEntityId(domain, entityId, pageable);
    }
}
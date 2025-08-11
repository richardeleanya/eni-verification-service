package com.example.demo.service.impl;

import com.example.demo.model.DwpApplication;
import com.example.demo.model.AuditLog;
import com.example.demo.repository.DwpApplicationRepository;
import com.example.demo.repository.AuditLogRepository;
import com.example.demo.service.DwpApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class DwpApplicationServiceImpl implements DwpApplicationService {

    @Autowired
    private DwpApplicationRepository dwpApplicationRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Override
    public List<DwpApplication> getAll() {
        return dwpApplicationRepository.findAll();
    }

    @Override
    public DwpApplication getById(Long id) {
        DwpApplication app = dwpApplicationRepository.findById(id).orElse(null);
        if (app != null) {
            AuditLog audit = new AuditLog();
            audit.setDomain("dwp");
            audit.setEntityId(id);
            audit.setAction("VIEWED");
            audit.setPerformedBy("system");
            audit.setTimestamp(Instant.now());
            auditLogRepository.save(audit);
        }
        return app;
    }
}
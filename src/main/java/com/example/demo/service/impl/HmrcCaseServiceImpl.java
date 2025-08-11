package com.example.demo.service.impl;

import com.example.demo.model.HmrcCase;
import com.example.demo.model.AuditLog;
import com.example.demo.repository.HmrcCaseRepository;
import com.example.demo.repository.AuditLogRepository;
import com.example.demo.service.HmrcCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class HmrcCaseServiceImpl implements HmrcCaseService {

    @Autowired
    private HmrcCaseRepository hmrcCaseRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Override
    public List<HmrcCase> getAll() {
        return hmrcCaseRepository.findAll();
    }

    @Override
    public HmrcCase getById(Long id) {
        HmrcCase c = hmrcCaseRepository.findById(id).orElse(null);
        if (c != null) {
            AuditLog audit = new AuditLog();
            audit.setDomain("hmrc");
            audit.setEntityId(id);
            audit.setAction("VIEWED");
            audit.setPerformedBy("system");
            audit.setTimestamp(Instant.now());
            auditLogRepository.save(audit);
        }
        return c;
    }
}
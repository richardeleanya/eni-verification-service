package com.example.demo.service.impl;

import com.example.demo.model.LocalAuthorityRecord;
import com.example.demo.model.AuditLog;
import com.example.demo.repository.LocalAuthorityRecordRepository;
import com.example.demo.repository.AuditLogRepository;
import com.example.demo.service.LocalAuthorityRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class LocalAuthorityRecordServiceImpl implements LocalAuthorityRecordService {

    @Autowired
    private LocalAuthorityRecordRepository recordRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Override
    public List<LocalAuthorityRecord> getAll() {
        return recordRepository.findAll();
    }

    @Override
    public LocalAuthorityRecord getById(Long id) {
        LocalAuthorityRecord rec = recordRepository.findById(id).orElse(null);
        if (rec != null) {
            AuditLog audit = new AuditLog();
            audit.setDomain("local-authorities");
            audit.setEntityId(id);
            audit.setAction("VIEWED");
            audit.setPerformedBy("system");
            audit.setTimestamp(Instant.now());
            auditLogRepository.save(audit);
        }
        return rec;
    }
}
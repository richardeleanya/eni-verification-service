package com.example.demo.service.impl;

import com.example.demo.model.PoliceRecord;
import com.example.demo.model.AuditLog;
import com.example.demo.repository.PoliceRecordRepository;
import com.example.demo.repository.AuditLogRepository;
import com.example.demo.service.PoliceRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class PoliceRecordServiceImpl implements PoliceRecordService {

    @Autowired
    private PoliceRecordRepository policeRecordRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Override
    public List<PoliceRecord> getAll() {
        return policeRecordRepository.findAll();
    }

    @Override
    public PoliceRecord getById(Long id) {
        PoliceRecord record = policeRecordRepository.findById(id).orElse(null);
        if (record != null) {
            // Write an audit log for viewing
            AuditLog audit = new AuditLog();
            audit.setDomain("police");
            audit.setEntityId(id);
            audit.setAction("VIEWED");
            audit.setPerformedBy("system"); // Replace with actual user if available
            audit.setTimestamp(Instant.now());
            auditLogRepository.save(audit);
        }
        return record;
    }
}
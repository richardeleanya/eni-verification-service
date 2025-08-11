package com.example.demo.service.impl;

import com.example.demo.model.NhsAppointment;
import com.example.demo.model.AuditLog;
import com.example.demo.repository.NhsAppointmentRepository;
import com.example.demo.repository.AuditLogRepository;
import com.example.demo.service.NhsAppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class NhsAppointmentServiceImpl implements NhsAppointmentService {

    @Autowired
    private NhsAppointmentRepository nhsAppointmentRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Override
    public List<NhsAppointment> getAll() {
        return nhsAppointmentRepository.findAll();
    }

    @Override
    public NhsAppointment getById(Long id) {
        NhsAppointment appointment = nhsAppointmentRepository.findById(id).orElse(null);
        if (appointment != null) {
            AuditLog audit = new AuditLog();
            audit.setDomain("nhs");
            audit.setEntityId(id);
            audit.setAction("VIEWED");
            audit.setPerformedBy("system");
            audit.setTimestamp(Instant.now());
            auditLogRepository.save(audit);
        }
        return appointment;
    }
}
package com.example.demo.service.impl;

import com.example.demo.model.FinancialTransaction;
import com.example.demo.model.AuditLog;
import com.example.demo.repository.FinancialTransactionRepository;
import com.example.demo.repository.AuditLogRepository;
import com.example.demo.service.FinancialTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class FinancialTransactionServiceImpl implements FinancialTransactionService {

    @Autowired
    private FinancialTransactionRepository transactionRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Override
    public List<FinancialTransaction> getAll() {
        return transactionRepository.findAll();
    }

    @Override
    public FinancialTransaction getById(Long id) {
        FinancialTransaction tx = transactionRepository.findById(id).orElse(null);
        if (tx != null) {
            AuditLog audit = new AuditLog();
            audit.setDomain("financial-services");
            audit.setEntityId(id);
            audit.setAction("VIEWED");
            audit.setPerformedBy("system");
            audit.setTimestamp(Instant.now());
            auditLogRepository.save(audit);
        }
        return tx;
    }
}
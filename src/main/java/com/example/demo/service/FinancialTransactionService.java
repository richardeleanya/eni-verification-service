package com.example.demo.service;

import com.example.demo.model.FinancialTransaction;
import java.util.List;

public interface FinancialTransactionService {
    List<FinancialTransaction> getAll();
    FinancialTransaction getById(Long id);
}
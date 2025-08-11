package com.example.demo.controller;

import com.example.demo.model.FinancialTransaction;
import com.example.demo.service.FinancialTransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/financial-services")
@Tag(name = "Financial Services", description = "Financial records endpoints")
public class IntegrationFinancialServicesController {

    @Autowired
    private FinancialTransactionService transactionService;

    @GetMapping
    @Operation(summary = "List Financial transactions (real data)")
    public List<FinancialTransaction> list() {
        return transactionService.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Financial transaction by id (real data)")
    public FinancialTransaction get(@PathVariable Long id) {
        return transactionService.getById(id);
    }
}
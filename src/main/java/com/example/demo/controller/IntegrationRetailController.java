package com.example.demo.controller;

import com.example.demo.dto.RetailTransactionDto;
import com.example.demo.service.RetailTransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/integrations/retail")
@PreAuthorize("hasRole('USER')")
public class IntegrationRetailController {

    private final RetailTransactionService retailTransactionService;

    public IntegrationRetailController(RetailTransactionService retailTransactionService) {
        this.retailTransactionService = retailTransactionService;
    }

    @GetMapping
    public ResponseEntity<List<RetailTransactionDto>> getAllRetailTransactions() {
        return ResponseEntity.ok(retailTransactionService.getAllRetailTransactions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RetailTransactionDto> getRetailTransactionById(@PathVariable Long id) {
        return ResponseEntity.ok(retailTransactionService.getRetailTransactionById(id));
    }

    @PostMapping
    public ResponseEntity<RetailTransactionDto> createRetailTransaction(@RequestBody RetailTransactionDto retailTransactionDto) {
        RetailTransactionDto createdRecord = retailTransactionService.createRetailTransaction(retailTransactionDto);
        return ResponseEntity.ok(createdRecord);
    }

    @PostMapping("/{id}/verify")
    public ResponseEntity<RetailTransactionDto> verifyRetailTransaction(@PathVariable Long id) {
        RetailTransactionDto verifiedRecord = retailTransactionService.verifyRetailTransaction(id);
        return ResponseEntity.ok(verifiedRecord);
    }
}

package com.example.demo.service;

import com.example.demo.dto.RetailTransactionDto;
import java.util.List;

public interface RetailTransactionService {
    List<RetailTransactionDto> getAllRetailTransactions();
    RetailTransactionDto getRetailTransactionById(Long id);
    RetailTransactionDto createRetailTransaction(RetailTransactionDto retailTransactionDto);
    RetailTransactionDto verifyRetailTransaction(Long id);
}

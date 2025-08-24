package com.example.demo.service.impl;

import com.example.demo.dto.RetailTransactionDto;
import com.example.demo.model.RetailTransaction;
import com.example.demo.repository.RetailTransactionRepository;
import com.example.demo.service.RetailTransactionService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RetailTransactionServiceImpl implements RetailTransactionService {

    private final RetailTransactionRepository retailTransactionRepository;

    public RetailTransactionServiceImpl(RetailTransactionRepository retailTransactionRepository) {
        this.retailTransactionRepository = retailTransactionRepository;
    }

    @Override
    public List<RetailTransactionDto> getAllRetailTransactions() {
        return retailTransactionRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public RetailTransactionDto getRetailTransactionById(Long id) {
        RetailTransaction retailTransaction = retailTransactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RetailTransaction not found"));
        return convertToDto(retailTransaction);
    }

    @Override
    public RetailTransactionDto createRetailTransaction(RetailTransactionDto retailTransactionDto) {
        RetailTransaction retailTransaction = convertToEntity(retailTransactionDto);
        retailTransaction.setSubmittedAt(Instant.now());
        retailTransaction.setCreatedBy("user");
        retailTransaction.setCreatedAt(Instant.now());
        RetailTransaction savedRetailTransaction = retailTransactionRepository.save(retailTransaction);
        return convertToDto(savedRetailTransaction);
    }

    @Override
    public RetailTransactionDto verifyRetailTransaction(Long id) {
        RetailTransaction retailTransaction = retailTransactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RetailTransaction not found"));
        retailTransaction.setVerificationStatus(RetailTransaction.VerificationStatus.VERIFIED);
        retailTransaction.setVerifiedAt(Instant.now());
        retailTransaction.setUpdatedBy("user");
        retailTransaction.setUpdatedAt(Instant.now());
        RetailTransaction updatedRetailTransaction = retailTransactionRepository.save(retailTransaction);
        return convertToDto(updatedRetailTransaction);
    }

    private RetailTransactionDto convertToDto(RetailTransaction retailTransaction) {
        RetailTransactionDto dto = new RetailTransactionDto();
        dto.setId(retailTransaction.getId());
        dto.setCustomerName(retailTransaction.getCustomerName());
        dto.setProduct(retailTransaction.getProduct());
        dto.setAmount(retailTransaction.getAmount());
        dto.setTransactionDate(retailTransaction.getTransactionDate());
        dto.setVerificationStatus(retailTransaction.getVerificationStatus());
        dto.setSubmittedAt(retailTransaction.getSubmittedAt());
        dto.setVerifiedAt(retailTransaction.getVerifiedAt());
        dto.setCreatedBy(retailTransaction.getCreatedBy());
        dto.setCreatedAt(retailTransaction.getCreatedAt());
        dto.setUpdatedBy(retailTransaction.getUpdatedBy());
        dto.setUpdatedAt(retailTransaction.getUpdatedAt());
        return dto;
    }

    private RetailTransaction convertToEntity(RetailTransactionDto dto) {
        RetailTransaction retailTransaction = new RetailTransaction();
        retailTransaction.setCustomerName(dto.getCustomerName());
        retailTransaction.setProduct(dto.getProduct());
        retailTransaction.setAmount(dto.getAmount());
        retailTransaction.setTransactionDate(dto.getTransactionDate());
        return retailTransaction;
    }
}

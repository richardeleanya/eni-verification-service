package com.example.demo.service;

import com.example.demo.dto.RetailTransactionDto;
import com.example.demo.model.RetailTransaction;
import com.example.demo.repository.RetailTransactionRepository;
import com.example.demo.service.impl.RetailTransactionServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class RetailTransactionServiceTest {

    @Mock
    private RetailTransactionRepository retailTransactionRepository;

    @InjectMocks
    private RetailTransactionServiceImpl retailTransactionService;

    private RetailTransaction retailTransaction;
    private RetailTransactionDto retailTransactionDto;

    @BeforeEach
    void setUp() {
        retailTransaction = new RetailTransaction();
        retailTransaction.setId(1L);
        retailTransaction.setCustomerName("John Doe");
        retailTransaction.setProduct("Laptop");
        retailTransaction.setAmount(new BigDecimal("1200.00"));
        retailTransaction.setTransactionDate(LocalDate.of(2023, 1, 1));
        retailTransaction.setVerificationStatus(RetailTransaction.VerificationStatus.PENDING);

        retailTransactionDto = new RetailTransactionDto();
        retailTransactionDto.setId(1L);
        retailTransactionDto.setCustomerName("John Doe");
        retailTransactionDto.setProduct("Laptop");
        retailTransactionDto.setAmount(new BigDecimal("1200.00"));
        retailTransactionDto.setTransactionDate(LocalDate.of(2023, 1, 1));
        retailTransactionDto.setVerificationStatus(RetailTransaction.VerificationStatus.PENDING);
    }

    @Test
    void testGetAllRetailTransactions() {
        when(retailTransactionRepository.findAll()).thenReturn(Collections.singletonList(retailTransaction));
        List<RetailTransactionDto> result = retailTransactionService.getAllRetailTransactions();
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("John Doe", result.get(0).getCustomerName());
    }

    @Test
    void testGetRetailTransactionById() {
        when(retailTransactionRepository.findById(1L)).thenReturn(Optional.of(retailTransaction));
        RetailTransactionDto result = retailTransactionService.getRetailTransactionById(1L);
        assertNotNull(result);
        assertEquals("John Doe", result.getCustomerName());
    }

    @Test
    void testCreateRetailTransaction() {
        when(retailTransactionRepository.save(any(RetailTransaction.class))).thenReturn(retailTransaction);
        RetailTransactionDto result = retailTransactionService.createRetailTransaction(retailTransactionDto);
        assertNotNull(result);
        assertEquals("John Doe", result.getCustomerName());
    }

    @Test
    void testVerifyRetailTransaction() {
        when(retailTransactionRepository.findById(1L)).thenReturn(Optional.of(retailTransaction));
        when(retailTransactionRepository.save(any(RetailTransaction.class))).thenReturn(retailTransaction);
        RetailTransactionDto result = retailTransactionService.verifyRetailTransaction(1L);
        assertNotNull(result);
        assertEquals(RetailTransaction.VerificationStatus.VERIFIED, result.getVerificationStatus());
    }
}

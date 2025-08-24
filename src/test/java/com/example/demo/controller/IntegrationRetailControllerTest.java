package com.example.demo.controller;

import com.example.demo.dto.RetailTransactionDto;
import com.example.demo.service.RetailTransactionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(IntegrationRetailController.class)
public class IntegrationRetailControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RetailTransactionService retailTransactionService;

    @MockBean
    private com.example.demo.security.JwtUtil jwtUtil;

    @MockBean
    private com.example.demo.service.impl.CustomUserDetailsService customUserDetailsService;

    @Autowired
    private ObjectMapper objectMapper;

    private RetailTransactionDto retailTransactionDto;

    @BeforeEach
    void setUp() {
        retailTransactionDto = new RetailTransactionDto();
        retailTransactionDto.setId(1L);
        retailTransactionDto.setCustomerName("John Doe");
        retailTransactionDto.setProduct("Laptop");
        retailTransactionDto.setAmount(new BigDecimal("1200.00"));
        retailTransactionDto.setTransactionDate(LocalDate.of(2023, 1, 1));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testGetAllRetailTransactions() throws Exception {
        when(retailTransactionService.getAllRetailTransactions()).thenReturn(Collections.singletonList(retailTransactionDto));

        mockMvc.perform(get("/api/integrations/retail"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].customerName").value("John Doe"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testGetRetailTransactionById() throws Exception {
        when(retailTransactionService.getRetailTransactionById(anyLong())).thenReturn(retailTransactionDto);

        mockMvc.perform(get("/api/integrations/retail/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.customerName").value("John Doe"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testCreateRetailTransaction() throws Exception {
        when(retailTransactionService.createRetailTransaction(any(RetailTransactionDto.class))).thenReturn(retailTransactionDto);

        mockMvc.perform(post("/api/integrations/retail")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(retailTransactionDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.customerName").value("John Doe"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testVerifyRetailTransaction() throws Exception {
        when(retailTransactionService.verifyRetailTransaction(anyLong())).thenReturn(retailTransactionDto);

        mockMvc.perform(post("/api/integrations/retail/1/verify").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.customerName").value("John Doe"));
    }
}

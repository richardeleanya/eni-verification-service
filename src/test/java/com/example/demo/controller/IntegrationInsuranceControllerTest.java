package com.example.demo.controller;

import com.example.demo.dto.InsuranceRecordDto;
import com.example.demo.service.InsuranceRecordService;
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
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(IntegrationInsuranceController.class)
public class IntegrationInsuranceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private InsuranceRecordService insuranceRecordService;

    @MockBean
    private com.example.demo.security.JwtUtil jwtUtil;

    @MockBean
    private com.example.demo.service.impl.CustomUserDetailsService customUserDetailsService;

    @Autowired
    private ObjectMapper objectMapper;

    private InsuranceRecordDto insuranceRecordDto;

    @BeforeEach
    void setUp() {
        insuranceRecordDto = new InsuranceRecordDto();
        insuranceRecordDto.setId(1L);
        insuranceRecordDto.setPolicyHolderName("John Doe");
        insuranceRecordDto.setPolicyNumber("POL-12345");
        insuranceRecordDto.setPolicyType("AUTO");
        insuranceRecordDto.setCoverageAmount(new BigDecimal("50000.00"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testGetAllInsuranceRecords() throws Exception {
        when(insuranceRecordService.getAllInsuranceRecords()).thenReturn(Collections.singletonList(insuranceRecordDto));

        mockMvc.perform(get("/api/integrations/insurance"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].policyHolderName").value("John Doe"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testGetInsuranceRecordById() throws Exception {
        when(insuranceRecordService.getInsuranceRecordById(anyLong())).thenReturn(insuranceRecordDto);

        mockMvc.perform(get("/api/integrations/insurance/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.policyHolderName").value("John Doe"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testCreateInsuranceRecord() throws Exception {
        when(insuranceRecordService.createInsuranceRecord(any(InsuranceRecordDto.class))).thenReturn(insuranceRecordDto);

        mockMvc.perform(post("/api/integrations/insurance")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(insuranceRecordDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.policyHolderName").value("John Doe"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testVerifyInsuranceRecord() throws Exception {
        when(insuranceRecordService.verifyInsuranceRecord(anyLong())).thenReturn(insuranceRecordDto);

        mockMvc.perform(post("/api/integrations/insurance/1/verify").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.policyHolderName").value("John Doe"));
    }
}

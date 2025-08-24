package com.example.demo.controller;

import com.example.demo.dto.HousingRentalRecordDto;
import com.example.demo.service.HousingRentalRecordService;
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

@WebMvcTest(IntegrationHousingRentalController.class)
public class IntegrationHousingRentalControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HousingRentalRecordService housingRentalRecordService;

    @MockBean
    private com.example.demo.security.JwtUtil jwtUtil;

    @MockBean
    private com.example.demo.service.impl.CustomUserDetailsService customUserDetailsService;

    @Autowired
    private ObjectMapper objectMapper;

    private HousingRentalRecordDto housingRentalRecordDto;

    @BeforeEach
    void setUp() {
        housingRentalRecordDto = new HousingRentalRecordDto();
        housingRentalRecordDto.setId(1L);
        housingRentalRecordDto.setTenantName("John Doe");
        housingRentalRecordDto.setPropertyAddress("123 Main St");
        housingRentalRecordDto.setLeaseStartDate(LocalDate.of(2023, 1, 1));
        housingRentalRecordDto.setLeaseEndDate(LocalDate.of(2023, 12, 31));
        housingRentalRecordDto.setRentAmount(new BigDecimal("1200.00"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testGetAllHousingRentalRecords() throws Exception {
        when(housingRentalRecordService.getAllHousingRentalRecords()).thenReturn(Collections.singletonList(housingRentalRecordDto));

        mockMvc.perform(get("/api/integrations/housing-rental"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].tenantName").value("John Doe"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testGetHousingRentalRecordById() throws Exception {
        when(housingRentalRecordService.getHousingRentalRecordById(anyLong())).thenReturn(housingRentalRecordDto);

        mockMvc.perform(get("/api/integrations/housing-rental/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tenantName").value("John Doe"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testCreateHousingRentalRecord() throws Exception {
        when(housingRentalRecordService.createHousingRentalRecord(any(HousingRentalRecordDto.class))).thenReturn(housingRentalRecordDto);

        mockMvc.perform(post("/api/integrations/housing-rental")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(housingRentalRecordDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tenantName").value("John Doe"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testVerifyHousingRentalRecord() throws Exception {
        when(housingRentalRecordService.verifyHousingRentalRecord(anyLong())).thenReturn(housingRentalRecordDto);

        mockMvc.perform(post("/api/integrations/housing-rental/1/verify").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tenantName").value("John Doe"));
    }
}

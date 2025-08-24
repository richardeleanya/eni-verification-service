package com.example.demo.controller;

import com.example.demo.dto.EducationRecordDto;
import com.example.demo.service.EducationRecordService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(IntegrationEducationController.class)
public class IntegrationEducationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EducationRecordService educationRecordService;

    @MockBean
    private com.example.demo.service.rate.RateLimitingService rateLimitingService;

    @MockBean
    private com.example.demo.security.JwtTokenProvider jwtTokenProvider;

    @MockBean
    private com.example.demo.security.JwtUtil jwtUtil;

    @MockBean
    private com.example.demo.service.impl.CustomUserDetailsService customUserDetailsService;

    @Autowired
    private ObjectMapper objectMapper;

    private EducationRecordDto educationRecordDto;

    @BeforeEach
    void setUp() {
        educationRecordDto = new EducationRecordDto();
        educationRecordDto.setId(1L);
        educationRecordDto.setStudentName("John Doe");
        educationRecordDto.setInstitution("University of Spring");
        educationRecordDto.setQualification("BSc Computer Science");
        educationRecordDto.setConferralDate(LocalDate.of(2023, 5, 20));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testGetAllEducationRecords() throws Exception {
        when(educationRecordService.getAllEducationRecords()).thenReturn(Collections.singletonList(educationRecordDto));

        mockMvc.perform(get("/api/integrations/education"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].studentName").value("John Doe"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testGetEducationRecordById() throws Exception {
        when(educationRecordService.getEducationRecordById(anyLong())).thenReturn(educationRecordDto);

        mockMvc.perform(get("/api/integrations/education/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.studentName").value("John Doe"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testCreateEducationRecord() throws Exception {
        when(educationRecordService.createEducationRecord(any(EducationRecordDto.class))).thenReturn(educationRecordDto);

        mockMvc.perform(post("/api/integrations/education")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(educationRecordDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.studentName").value("John Doe"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testVerifyEducationRecord() throws Exception {
        when(educationRecordService.verifyEducationRecord(anyLong())).thenReturn(educationRecordDto);

        mockMvc.perform(post("/api/integrations/education/1/verify").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.studentName").value("John Doe"));
    }

    @Test
    void testGetAllEducationRecords_unauthorized() throws Exception {
        mockMvc.perform(get("/api/integrations/education"))
                .andExpect(status().isUnauthorized());
    }
}

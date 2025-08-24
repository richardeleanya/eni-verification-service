package com.example.demo.controller;

import com.example.demo.dto.ConsentDto;
import com.example.demo.service.ConsentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ConsentController.class)
public class ConsentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ConsentService consentService;

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

    private ConsentDto consentDto;

    @BeforeEach
    void setUp() {
        consentDto = new ConsentDto();
        consentDto.setId(1L);
        consentDto.setAgencyFrom("HMRC");
        consentDto.setAgencyTo("Police");
        consentDto.setGranted(true);
    }

    @Test
    @WithMockUser(roles = "USER")
    void testGetConsents() throws Exception {
        when(consentService.getConsents(any())).thenReturn(Collections.singletonList(consentDto));

        mockMvc.perform(get("/api/consents"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].agencyFrom").value("HMRC"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testUpdateConsent() throws Exception {
        when(consentService.updateConsent(any(), any(ConsentDto.class))).thenReturn(consentDto);

        mockMvc.perform(post("/api/consents")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(consentDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.agencyFrom").value("HMRC"));
    }
}

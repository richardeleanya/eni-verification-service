package com.example.demo.controller;

import com.example.demo.payload.EmployerRequest;
import com.example.demo.model.Employer;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class EmployerControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private Long createdEmployerId;

    @BeforeEach
    void setUp() throws Exception {
        // Submit a test employer for GET by id
        EmployerRequest request = new EmployerRequest();
        request.setCompanyName("Test Company Ltd");
        String json = objectMapper.writeValueAsString(request);

        MvcResult result = mockMvc.perform(post("/api/employers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.companyName").value("Test Company Ltd"))
                .andExpect(jsonPath("$.verificationStatus").value("PENDING"))
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        Employer created = objectMapper.readValue(responseBody, Employer.class);
        createdEmployerId = created.getId();
    }

    @Test
    void testGetEmployersReturnsOkAndJsonArray() throws Exception {
        mockMvc.perform(get("/api/employers"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void testPostEmployerReturnsOkAndCorrectResponse() throws Exception {
        EmployerRequest request = new EmployerRequest();
        request.setCompanyName("Another Co");
        String json = objectMapper.writeValueAsString(request);

        mockMvc.perform(post("/api/employers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.companyName").value("Another Co"))
                .andExpect(jsonPath("$.verificationStatus").value("PENDING"));
    }

    @Test
    void testGetEmployerByIdReturnsCorrectEmployer() throws Exception {
        mockMvc.perform(get("/api/employers/{id}", createdEmployerId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(createdEmployerId))
                .andExpect(jsonPath("$.companyName").value("Test Company Ltd"))
                .andExpect(jsonPath("$.verificationStatus").value("PENDING"));
    }
}
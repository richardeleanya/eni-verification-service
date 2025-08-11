package com.example.demo.controller;

import com.example.demo.model.AuditLog;
import com.example.demo.repository.AuditLogRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class AuditControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        auditLogRepository.deleteAll();
        AuditLog log1 = new AuditLog();
        log1.setDomain("employer");
        log1.setEntityId(1L);
        log1.setAction("CREATED");
        log1.setPerformedBy("system");
        log1.setTimestamp(Instant.now());
        auditLogRepository.save(log1);

        AuditLog log2 = new AuditLog();
        log2.setDomain("employer");
        log2.setEntityId(1L);
        log2.setAction("VERIFIED");
        log2.setPerformedBy("admin");
        log2.setTimestamp(Instant.now().plusSeconds(3600));
        auditLogRepository.save(log2);
    }

    @Test
    void testGetAuditLogsByDomainAndEntityId() throws Exception {
        String url = "/api/audit?domain=employer&entityId=1&page=0&size=10";
        String json = mockMvc.perform(get(url).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(2))
                .andExpect(jsonPath("$.content").isArray())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode root = objectMapper.readTree(json);
        assertThat(root.get("totalElements").asInt()).isEqualTo(2);
        assertThat(root.get("content").size()).isEqualTo(2);

        // Check actions exist
        boolean foundCreated = false, foundVerified = false;
        for (JsonNode node : root.get("content")) {
            String action = node.get("action").asText();
            if ("CREATED".equals(action)) foundCreated = true;
            if ("VERIFIED".equals(action)) foundVerified = true;
        }
        assertThat(foundCreated).isTrue();
        assertThat(foundVerified).isTrue();
    }
}
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
public class PoliceAuditIntegrationTest {

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
        log1.setDomain("police");
        log1.setEntityId(3L);
        log1.setAction("CREATED");
        log1.setPerformedBy("officer");
        log1.setTimestamp(Instant.now());
        auditLogRepository.save(log1);

        AuditLog log2 = new AuditLog();
        log2.setDomain("police");
        log2.setEntityId(3L);
        log2.setAction("REVIEWED");
        log2.setPerformedBy("sergeant");
        log2.setTimestamp(Instant.now().plusSeconds(1800));
        auditLogRepository.save(log2);
    }

    @Test
    void testGetPoliceAuditLogs() throws Exception {
        String url = "/api/audit?domain=police&entityId=3&page=0&size=10";
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

        boolean foundCreated = false, foundReviewed = false;
        for (JsonNode node : root.get("content")) {
            String action = node.get("action").asText();
            if ("CREATED".equals(action)) foundCreated = true;
            if ("REVIEWED".equals(action)) foundReviewed = true;
        }
        assertThat(foundCreated).isTrue();
        assertThat(foundReviewed).isTrue();
    }
}
package com.example.demo.controller;

import com.example.demo.model.PoliceRecord;
import com.example.demo.model.AuditLog;
import com.example.demo.repository.PoliceRecordRepository;
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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class PoliceControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PoliceRecordRepository policeRecordRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Long seededId;
    private String seededCaseId;

    @BeforeEach
    void setUp() {
        auditLogRepository.deleteAll();
        policeRecordRepository.deleteAll();
        PoliceRecord pr = new PoliceRecord();
        pr.setCaseId("CASE-9999");
        pr.setStatus("Active");
        pr.setReportedAt(Instant.now().minusSeconds(1200));
        pr = policeRecordRepository.save(pr);
        seededId = pr.getId();
        seededCaseId = pr.getCaseId();
    }

    @Test
    void testGetAllPoliceRecordsReturnsArray() throws Exception {
        String json = mockMvc.perform(get("/api/police").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn().getResponse().getContentAsString();

        JsonNode arr = objectMapper.readTree(json);
        assertThat(arr.isArray()).isTrue();
        assertThat(arr.size()).isGreaterThanOrEqualTo(1);
        boolean found = false;
        for (JsonNode node : arr) {
            if (node.get("id").asLong() == seededId && seededCaseId.equals(node.get("caseId").asText())) {
                found = true;
                break;
            }
        }
        assertThat(found).isTrue();
    }

    @Test
    void testGetPoliceRecordByIdReturnsCorrectAndAudit() throws Exception {
        String json = mockMvc.perform(get("/api/police/" + seededId).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.caseId").value(seededCaseId))
                .andReturn().getResponse().getContentAsString();

        // Check audit log was written
        List<AuditLog> logs = auditLogRepository.findAll();
        assertThat(logs.stream().anyMatch(
            log -> "police".equals(log.getDomain())
                    && log.getEntityId().equals(seededId)
                    && "VIEWED".equals(log.getAction())
        )).isTrue();
    }
}
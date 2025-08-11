package com.example.demo.payload;

import java.time.Instant;

public class PoliceRecordResponse {
    private Long id;
    private String caseId;
    private String status;
    private Instant reportedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCaseId() { return caseId; }
    public void setCaseId(String caseId) { this.caseId = caseId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Instant getReportedAt() { return reportedAt; }
    public void setReportedAt(Instant reportedAt) { this.reportedAt = reportedAt; }
}
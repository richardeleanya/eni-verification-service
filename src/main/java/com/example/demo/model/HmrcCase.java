package com.example.demo.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class HmrcCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String caseId;

    private String status;

    private Instant date;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCaseId() { return caseId; }
    public void setCaseId(String caseId) { this.caseId = caseId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Instant getDate() { return date; }
    public void setDate(Instant date) { this.date = date; }
}
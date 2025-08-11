package com.example.demo.payload;

import com.example.demo.model.Employer.VerificationStatus;
import java.time.Instant;

public class VerificationResponse {
    private Long employerId;
    private VerificationStatus newStatus;
    private Instant verifiedAt;

    public Long getEmployerId() { return employerId; }
    public void setEmployerId(Long employerId) { this.employerId = employerId; }
    public VerificationStatus getNewStatus() { return newStatus; }
    public void setNewStatus(VerificationStatus newStatus) { this.newStatus = newStatus; }
    public Instant getVerifiedAt() { return verifiedAt; }
    public void setVerifiedAt(Instant verifiedAt) { this.verifiedAt = verifiedAt; }
}
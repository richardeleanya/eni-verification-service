package com.example.demo.payload;

public class VerificationRequest {
    private boolean verify;
    private String reviewer;

    public boolean isVerify() { return verify; }
    public void setVerify(boolean verify) { this.verify = verify; }
    public String getReviewer() { return reviewer; }
    public void setReviewer(String reviewer) { this.reviewer = reviewer; }
}
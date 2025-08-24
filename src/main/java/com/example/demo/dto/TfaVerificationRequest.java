package com.example.demo.dto;

import lombok.Data;

@Data
public class TfaVerificationRequest {
    private String email;
    private String code;
}

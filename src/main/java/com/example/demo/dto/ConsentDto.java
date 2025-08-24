package com.example.demo.dto;

import lombok.Data;

@Data
public class ConsentDto {
    private Long id;
    private String agencyFrom;
    private String agencyTo;
    private boolean granted;
}

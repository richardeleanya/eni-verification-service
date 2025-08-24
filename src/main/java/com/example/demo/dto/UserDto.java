package com.example.demo.dto;

import lombok.Data;

import com.example.demo.model.PricingPlan;

@Data
public class UserDto {
    private String username;
    private String password;
    private String email;
    private PricingPlan pricingPlan;
    private boolean tfaEnabled;
}

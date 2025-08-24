package com.example.demo.service;

import com.example.demo.model.User;

public interface RiskScoringService {
    int calculateRiskScore(User user);
}

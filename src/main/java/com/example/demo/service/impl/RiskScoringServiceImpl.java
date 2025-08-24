package com.example.demo.service.impl;

import com.example.demo.model.User;
import com.example.demo.service.RiskScoringService;
import org.springframework.stereotype.Service;

@Service
public class RiskScoringServiceImpl implements RiskScoringService {

    @Override
    public int calculateRiskScore(User user) {
        // A real implementation would have more complex logic,
        // but for now, we'll just return a fixed score.
        return 10;
    }
}

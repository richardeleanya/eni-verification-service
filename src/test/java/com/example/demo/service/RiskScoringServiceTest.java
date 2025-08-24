package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.service.impl.RiskScoringServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class RiskScoringServiceTest {

    @InjectMocks
    private RiskScoringServiceImpl riskScoringService;

    @Test
    void testCalculateRiskScore() {
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");

        int riskScore = riskScoringService.calculateRiskScore(user);

        assertEquals(10, riskScore);
    }
}

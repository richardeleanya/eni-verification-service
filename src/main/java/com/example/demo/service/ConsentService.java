package com.example.demo.service;

import com.example.demo.dto.ConsentDto;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface ConsentService {
    List<ConsentDto> getConsents(UserDetails userDetails);
    ConsentDto updateConsent(UserDetails userDetails, ConsentDto consentDto);
}

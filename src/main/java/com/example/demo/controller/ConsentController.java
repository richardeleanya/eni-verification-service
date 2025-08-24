package com.example.demo.controller;

import com.example.demo.dto.ConsentDto;
import com.example.demo.service.ConsentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consents")
@RequiredArgsConstructor
public class ConsentController {

    private final ConsentService consentService;

    @GetMapping
    public ResponseEntity<List<ConsentDto>> getConsents(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(consentService.getConsents(userDetails));
    }

    @PostMapping
    public ResponseEntity<ConsentDto> updateConsent(@AuthenticationPrincipal UserDetails userDetails, @RequestBody ConsentDto consentDto) {
        return ResponseEntity.ok(consentService.updateConsent(userDetails, consentDto));
    }
}

package com.example.demo.service.impl;

import com.example.demo.dto.ConsentDto;
import com.example.demo.model.Consent;
import com.example.demo.model.User;
import com.example.demo.repository.ConsentRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ConsentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConsentServiceImpl implements ConsentService {

    private final ConsentRepository consentRepository;
    private final UserRepository userRepository;

    @Override
    public List<ConsentDto> getConsents(UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return consentRepository.findByUserId(user.getId()).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ConsentDto updateConsent(UserDetails userDetails, ConsentDto consentDto) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        Consent consent = consentRepository.findById(consentDto.getId()).orElse(new Consent());
        consent.setUser(user);
        consent.setAgencyFrom(consentDto.getAgencyFrom());
        consent.setAgencyTo(consentDto.getAgencyTo());
        consent.setGranted(consentDto.isGranted());
        return toDto(consentRepository.save(consent));
    }

    private ConsentDto toDto(Consent consent) {
        ConsentDto dto = new ConsentDto();
        dto.setId(consent.getId());
        dto.setAgencyFrom(consent.getAgencyFrom());
        dto.setAgencyTo(consent.getAgencyTo());
        dto.setGranted(consent.isGranted());
        return dto;
    }
}

package com.example.demo.service;

import com.example.demo.dto.ConsentDto;
import com.example.demo.model.Consent;
import com.example.demo.model.User;
import com.example.demo.repository.ConsentRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.impl.ConsentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ConsentServiceTest {

    @Mock
    private ConsentRepository consentRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ConsentServiceImpl consentService;

    @Mock
    private UserDetails userDetails;

    private User user;
    private Consent consent;
    private ConsentDto consentDto;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setUsername("testuser");

        consent = new Consent();
        consent.setId(1L);
        consent.setUser(user);
        consent.setAgencyFrom("HMRC");
        consent.setAgencyTo("Police");
        consent.setGranted(true);

        consentDto = new ConsentDto();
        consentDto.setId(1L);
        consentDto.setAgencyFrom("HMRC");
        consentDto.setAgencyTo("Police");
        consentDto.setGranted(true);
    }

    @Test
    void testGetConsents() {
        when(userDetails.getUsername()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(consentRepository.findByUserId(1L)).thenReturn(Collections.singletonList(consent));

        List<ConsentDto> result = consentService.getConsents(userDetails);

        assertEquals(1, result.size());
        assertEquals("HMRC", result.get(0).getAgencyFrom());
    }

    @Test
    void testUpdateConsent() {
        when(userDetails.getUsername()).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(consentRepository.findById(1L)).thenReturn(Optional.of(consent));
        when(consentRepository.save(any(Consent.class))).thenReturn(consent);

        ConsentDto result = consentService.updateConsent(userDetails, consentDto);

        assertEquals("HMRC", result.getAgencyFrom());
    }
}

package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.example.demo.service.tfa.TwoFactorAuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TwoFactorAuthController.class)
public class TwoFactorAuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TwoFactorAuthService tfaService;

    @MockBean
    private UserService userService;

    @MockBean
    private com.example.demo.service.rate.RateLimitingService rateLimitingService;

    @MockBean
    private com.example.demo.security.JwtTokenProvider jwtTokenProvider;

    @MockBean
    private com.example.demo.security.JwtUtil jwtUtil;

    @Test
    @WithMockUser
    public void testSetupDevice() throws Exception {
        User user = new User();
        user.setEmail("user");
        when(userService.findByUsername("user")).thenReturn(user);
        when(tfaService.generateNewSecret()).thenReturn("secret");
        when(tfaService.getQRCodeImage(anyString(), anyString())).thenReturn(new byte[0]);

        mockMvc.perform(post("/api/2fa/setup").with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    public void testEnableTfa() throws Exception {
        User user = new User();
        user.setTfaSecret("secret");
        when(userService.findByUsername("user")).thenReturn(user);
        when(tfaService.verifyCode("secret", "123456")).thenReturn(true);

        mockMvc.perform(post("/api/2fa/enable").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("123456"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    public void testDisableTfa() throws Exception {
        User user = new User();
        when(userService.findByUsername("user")).thenReturn(user);

        mockMvc.perform(post("/api/2fa/disable").with(csrf()))
                .andExpect(status().isOk());
    }
}

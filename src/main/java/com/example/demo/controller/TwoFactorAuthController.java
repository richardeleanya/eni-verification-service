package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.example.demo.service.tfa.TwoFactorAuthService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/2fa")
public class TwoFactorAuthController {

    private final TwoFactorAuthService tfaService;
    private final UserService userService;

    public TwoFactorAuthController(TwoFactorAuthService tfaService, UserService userService) {
        this.tfaService = tfaService;
        this.userService = userService;
    }

    @PostMapping("/setup")
    public ResponseEntity<byte[]> setupDevice(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        String secret = tfaService.generateNewSecret();
        user.setTfaSecret(secret);
        userService.save(user);
        byte[] qrCode = tfaService.getQRCodeImage(secret, user.getEmail());
        return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(qrCode);
    }

    @PostMapping("/enable")
    public ResponseEntity<?> enableTfa(Principal principal, @RequestBody String code) {
        User user = userService.findByUsername(principal.getName());
        if (tfaService.verifyCode(user.getTfaSecret(), code)) {
            user.setTfaEnabled(true);
            userService.save(user);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().body("Invalid 2FA code");
    }

    @PostMapping("/disable")
    public ResponseEntity<?> disableTfa(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        user.setTfaEnabled(false);
        userService.save(user);
        return ResponseEntity.ok().build();
    }
}

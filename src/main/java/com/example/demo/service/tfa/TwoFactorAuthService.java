package com.example.demo.service.tfa;

public interface TwoFactorAuthService {
    String generateNewSecret();
    byte[] getQRCodeImage(String secret, String email);
    boolean verifyCode(String secret, String code);
}

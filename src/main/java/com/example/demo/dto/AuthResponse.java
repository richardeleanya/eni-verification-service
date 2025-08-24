package com.example.demo.dto;

public class AuthResponse {
    private String email;
    private String token;
    private boolean tfaRequired;

    public AuthResponse(String email, String token) {
        this.email = email;
        this.token = token;
        this.tfaRequired = false;
    }

    public AuthResponse(String email, boolean tfaRequired) {
        this.email = email;
        this.tfaRequired = tfaRequired;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isTfaRequired() {
        return tfaRequired;
    }

    public void setTfaRequired(boolean tfaRequired) {
        this.tfaRequired = tfaRequired;
    }
}

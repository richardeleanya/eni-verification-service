package com.example.demo.dto;

public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private boolean tfaEnabled;

    public UserResponse(Long id, String username, String email, boolean tfaEnabled) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.tfaEnabled = tfaEnabled;
    }

    // Getters only
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public boolean isTfaEnabled() { return tfaEnabled; }
}

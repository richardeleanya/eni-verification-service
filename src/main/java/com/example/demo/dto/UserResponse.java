package com.example.demo.dto;

public class UserResponse {
    private Long id;
    private String username;
    private String email;

    public UserResponse(Long id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    // Getters only
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
}

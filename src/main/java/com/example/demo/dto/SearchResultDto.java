package com.example.demo.dto;

public class SearchResultDto {
    private String type;
    private Long id;
    private String title;
    private String snippet;

    public SearchResultDto() {}

    public SearchResultDto(String type, Long id, String title, String snippet) {
        this.type = type;
        this.id = id;
        this.title = title;
        this.snippet = snippet;
    }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSnippet() { return snippet; }
    public void setSnippet(String snippet) { this.snippet = snippet; }
}
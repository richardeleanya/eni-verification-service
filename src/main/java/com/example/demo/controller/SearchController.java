package com.example.demo.controller;

import com.example.demo.dto.SearchResultDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/search")
@Tag(name = "Global Search", description = "Search across all domains (employers, users, etc.)")
public class SearchController {

    @GetMapping
    @Operation(
            summary = "Global search",
            description = "Searches across all supported domains and returns a list of results (stubbed for MVP)"
    )
    public List<SearchResultDto> search(
            @Parameter(description = "Search query string") @RequestParam(value = "q") String query
    ) {
        // Stubbed sample data for demonstration
        List<SearchResultDto> results = new ArrayList<>();
        if (query != null && !query.trim().isEmpty()) {
            results.add(new SearchResultDto("employer", 1L, "Sample Employer Ltd", "Employer profile for Sample Employer Ltd"));
            results.add(new SearchResultDto("user", 2L, "Jane Doe", "User profile for Jane Doe"));
        }
        return results;
    }
}
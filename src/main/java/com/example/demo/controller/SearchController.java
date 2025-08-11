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
            results.add(new SearchResultDto("employer", 1L, "Sample Employer #1", "This is a sample employer record."));
            results.add(new SearchResultDto("user", 2L, "Sample User #2", "This is a sample user record."));
            results.add(new SearchResultDto("police", 3L, "Sample Police Record #3", "This is a sample police record."));
            results.add(new SearchResultDto("hmrc", 4L, "Sample HMRC Case #4", "This is a sample hmrc record."));
            results.add(new SearchResultDto("dwp", 5L, "Sample DWP Application #5", "This is a sample dwp record."));
            results.add(new SearchResultDto("nhs", 6L, "Sample NHS Appointment #6", "This is a sample nhs record."));
            results.add(new SearchResultDto("local-authorities", 7L, "Sample Local Authorities Record #7", "This is a sample local authorities record."));
            results.add(new SearchResultDto("financial-services", 8L, "Sample Financial Transaction #8", "This is a sample financial services record."));
            results.add(new SearchResultDto("housing-rental", 9L, "Sample Housing Application #9", "This is a sample housing rental record."));
            results.add(new SearchResultDto("education", 10L, "Sample Education Record #10", "This is a sample education record."));
            results.add(new SearchResultDto("retail", 11L, "Sample Retail Transaction #11", "This is a sample retail record."));
            results.add(new SearchResultDto("insurance", 12L, "Sample Insurance Claim #12", "This is a sample insurance record."));
        }
        return results;
    }
}
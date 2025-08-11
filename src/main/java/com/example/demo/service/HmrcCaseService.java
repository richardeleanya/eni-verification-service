package com.example.demo.service;

import com.example.demo.model.HmrcCase;
import java.util.List;

public interface HmrcCaseService {
    List<HmrcCase> getAll();
    HmrcCase getById(Long id);
}
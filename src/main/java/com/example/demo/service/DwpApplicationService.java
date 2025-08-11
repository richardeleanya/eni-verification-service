package com.example.demo.service;

import com.example.demo.model.DwpApplication;
import java.util.List;

public interface DwpApplicationService {
    List<DwpApplication> getAll();
    DwpApplication getById(Long id);
}
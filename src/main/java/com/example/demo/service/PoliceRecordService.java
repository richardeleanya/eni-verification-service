package com.example.demo.service;

import com.example.demo.model.PoliceRecord;

import java.util.List;

public interface PoliceRecordService {
    List<PoliceRecord> getAll();
    PoliceRecord getById(Long id);
}
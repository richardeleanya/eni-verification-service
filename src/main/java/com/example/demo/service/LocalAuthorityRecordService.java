package com.example.demo.service;

import com.example.demo.model.LocalAuthorityRecord;
import java.util.List;

public interface LocalAuthorityRecordService {
    List<LocalAuthorityRecord> getAll();
    LocalAuthorityRecord getById(Long id);
}
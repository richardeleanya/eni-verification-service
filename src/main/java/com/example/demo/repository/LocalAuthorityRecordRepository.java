package com.example.demo.repository;

import com.example.demo.model.LocalAuthorityRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalAuthorityRecordRepository extends JpaRepository<LocalAuthorityRecord, Long> {
}
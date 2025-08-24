package com.example.demo.repository;

import com.example.demo.model.InsuranceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsuranceRecordRepository extends JpaRepository<InsuranceRecord, Long> {
}

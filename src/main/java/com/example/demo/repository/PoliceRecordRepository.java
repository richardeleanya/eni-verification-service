package com.example.demo.repository;

import com.example.demo.model.PoliceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoliceRecordRepository extends JpaRepository<PoliceRecord, Long> {
}
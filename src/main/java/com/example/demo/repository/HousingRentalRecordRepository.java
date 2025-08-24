package com.example.demo.repository;

import com.example.demo.model.HousingRentalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HousingRentalRecordRepository extends JpaRepository<HousingRentalRecord, Long> {
}

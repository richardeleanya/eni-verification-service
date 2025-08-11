package com.example.demo.repository;

import com.example.demo.model.HmrcCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HmrcCaseRepository extends JpaRepository<HmrcCase, Long> {
}
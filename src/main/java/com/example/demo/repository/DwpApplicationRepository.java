package com.example.demo.repository;

import com.example.demo.model.DwpApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DwpApplicationRepository extends JpaRepository<DwpApplication, Long> {
}
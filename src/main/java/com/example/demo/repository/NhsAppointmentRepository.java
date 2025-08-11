package com.example.demo.repository;

import com.example.demo.model.NhsAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NhsAppointmentRepository extends JpaRepository<NhsAppointment, Long> {
}
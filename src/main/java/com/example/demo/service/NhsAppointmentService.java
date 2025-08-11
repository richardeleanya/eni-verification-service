package com.example.demo.service;

import com.example.demo.model.NhsAppointment;
import java.util.List;

public interface NhsAppointmentService {
    List<NhsAppointment> getAll();
    NhsAppointment getById(Long id);
}
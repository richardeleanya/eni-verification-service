package com.example.demo.controller;

import com.example.demo.model.NhsAppointment;
import com.example.demo.service.NhsAppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nhs")
@Tag(name = "NHS", description = "NHS appointment endpoints")
public class IntegrationNhsController {

    @Autowired
    private NhsAppointmentService nhsAppointmentService;

    @GetMapping
    @Operation(summary = "List NHS appointments (real data)")
    public List<NhsAppointment> list() {
        return nhsAppointmentService.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get NHS appointment by id (real data)")
    public NhsAppointment get(@PathVariable Long id) {
        return nhsAppointmentService.getById(id);
    }
}
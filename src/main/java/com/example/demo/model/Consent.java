package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "consents")
public class Consent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "agency_from", nullable = false)
    private String agencyFrom;

    @Column(name = "agency_to", nullable = false)
    private String agencyTo;

    @Column(name = "granted", nullable = false)
    private boolean granted;
}

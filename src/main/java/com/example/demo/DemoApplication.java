package com.example.demo;

import com.example.demo.model.PoliceRecord;
import com.example.demo.repository.PoliceRecordRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.Instant;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    CommandLineRunner seedPoliceRecords(PoliceRecordRepository policeRecordRepository) {
        return args -> {
            if (policeRecordRepository.count() == 0) {
                PoliceRecord p1 = new PoliceRecord();
                p1.setCaseId("CASE-1001");
                p1.setStatus("Active");
                p1.setReportedAt(Instant.now().minusSeconds(86400));
                policeRecordRepository.save(p1);

                PoliceRecord p2 = new PoliceRecord();
                p2.setCaseId("CASE-1002");
                p2.setStatus("Closed");
                p2.setReportedAt(Instant.now().minusSeconds(432000));
                policeRecordRepository.save(p2);
            }
        };
    }
}
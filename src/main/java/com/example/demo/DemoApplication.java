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
    CommandLineRunner seedPoliceRecordsAndHmrcCases(
        PoliceRecordRepository policeRecordRepository,
        com.example.demo.repository.HmrcCaseRepository hmrcCaseRepository
    ) {
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
            if (hmrcCaseRepository.count() == 0) {
                com.example.demo.model.HmrcCase h1 = new com.example.demo.model.HmrcCase();
                h1.setCaseId("HMRC-2001");
                h1.setStatus("Active");
                h1.setDate(Instant.now().minusSeconds(172800));
                hmrcCaseRepository.save(h1);

                com.example.demo.model.HmrcCase h2 = new com.example.demo.model.HmrcCase();
                h2.setCaseId("HMRC-2002");
                h2.setStatus("Closed");
                h2.setDate(Instant.now().minusSeconds(604800));
                hmrcCaseRepository.save(h2);
            }

            org.springframework.context.ApplicationContext ctx = org.springframework.boot.SpringApplication.run(com.example.demo.DemoApplication.class, args);
            com.example.demo.repository.DwpApplicationRepository dwpRepo = ctx.getBean(com.example.demo.repository.DwpApplicationRepository.class);
            if (dwpRepo.count() == 0) {
                com.example.demo.model.DwpApplication d1 = new com.example.demo.model.DwpApplication();
                d1.setApplicationId("APP-3001");
                d1.setStatus("Active");
                d1.setDate(Instant.now().minusSeconds(345600));
                dwpRepo.save(d1);

                com.example.demo.model.DwpApplication d2 = new com.example.demo.model.DwpApplication();
                d2.setApplicationId("APP-3002");
                d2.setStatus("Closed");
                d2.setDate(Instant.now().minusSeconds(864000));
                dwpRepo.save(d2);
            }

            com.example.demo.repository.NhsAppointmentRepository nhsRepo = ctx.getBean(com.example.demo.repository.NhsAppointmentRepository.class);
            if (nhsRepo.count() == 0) {
                com.example.demo.model.NhsAppointment n1 = new com.example.demo.model.NhsAppointment();
                n1.setAppointmentId("APT-4001");
                n1.setStatus("Scheduled");
                n1.setDate(Instant.now().minusSeconds(259200));
                nhsRepo.save(n1);

                com.example.demo.model.NhsAppointment n2 = new com.example.demo.model.NhsAppointment();
                n2.setAppointmentId("APT-4002");
                n2.setStatus("Completed");
                n2.setDate(Instant.now().minusSeconds(604800));
                nhsRepo.save(n2);
            }

            com.example.demo.repository.LocalAuthorityRecordRepository localRepo = ctx.getBean(com.example.demo.repository.LocalAuthorityRecordRepository.class);
            if (localRepo.count() == 0) {
                com.example.demo.model.LocalAuthorityRecord r1 = new com.example.demo.model.LocalAuthorityRecord();
                r1.setApplicationId("REC-5001");
                r1.setStatus("Active");
                r1.setDate(Instant.now().minusSeconds(345600));
                localRepo.save(r1);

                com.example.demo.model.LocalAuthorityRecord r2 = new com.example.demo.model.LocalAuthorityRecord();
                r2.setApplicationId("REC-5002");
                r2.setStatus("Closed");
                r2.setDate(Instant.now().minusSeconds(864000));
                localRepo.save(r2);
            }
        };
    }
}
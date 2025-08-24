package com.example.demo.service.rate;

import com.example.demo.model.PricingPlan;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class RateLimitingService {

    private final Map<String, Bucket> cache = new ConcurrentHashMap<>();
    private final Environment env;

    public Bucket resolveBucket(String apiKey, PricingPlan plan) {
        return cache.computeIfAbsent(apiKey, key -> newBucket(plan));
    }

    private Bucket newBucket(PricingPlan plan) {
        String capacity = env.getProperty("pricing.plan." + plan.name().toLowerCase() + ".bucket.capacity");
        String refillRate = env.getProperty("pricing.plan." + plan.name().toLowerCase() + ".bucket.refill-rate");
        String refillDurationMinutes = env.getProperty("pricing.plan." + plan.name().toLowerCase() + ".bucket.refill-duration-minutes");

        long capacityLong = Long.parseLong(capacity);
        long refillRateLong = Long.parseLong(refillRate);
        long refillDurationMinutesLong = Long.parseLong(refillDurationMinutes);

        Refill refill = Refill.intervally(refillRateLong, Duration.ofMinutes(refillDurationMinutesLong));
        Bandwidth limit = Bandwidth.classic(capacityLong, refill);
        return Bucket.builder().addLimit(limit).build();
    }
}

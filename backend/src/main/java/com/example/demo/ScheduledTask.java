package com.example.demo;

import com.example.demo.entities.ProductEntity;
import com.example.demo.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class ScheduledTask {
    private static final long ZERO_VIEWS = 0;

    private final ProductRepository productRepository;

    @Scheduled(cron = "${scheduled.cron.weekly-views}", zone = "${scheduled.zone}")
    public void weeklyViewsTask() {
        List<ProductEntity> products = productRepository.findAll();
        products.forEach(p -> p.setWeeklyViews(ZERO_VIEWS));
        productRepository.saveAll(products);
    }

    @Scheduled(cron = "${scheduled.cron.monthly-views}", zone = "${scheduled.zone}")
    public void monthlyViewsTask() {
        List<ProductEntity> products = productRepository.findAll();
        products.forEach(p -> p.setMonthlyViews(ZERO_VIEWS));
        productRepository.saveAll(products);
    }
}

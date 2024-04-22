package com.fastx.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class OrderTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Order getOrderSample1() {
        return new Order().id("id1").orderId(1L).status("status1").deliveryId(1L);
    }

    public static Order getOrderSample2() {
        return new Order().id("id2").orderId(2L).status("status2").deliveryId(2L);
    }

    public static Order getOrderRandomSampleGenerator() {
        return new Order()
            .id(UUID.randomUUID().toString())
            .orderId(longCount.incrementAndGet())
            .status(UUID.randomUUID().toString())
            .deliveryId(longCount.incrementAndGet());
    }
}

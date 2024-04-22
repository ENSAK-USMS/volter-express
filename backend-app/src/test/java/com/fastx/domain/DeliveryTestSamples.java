package com.fastx.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class DeliveryTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Delivery getDeliverySample1() {
        return new Delivery()
            .id("id1")
            .orderId(1L)
            .deliveryAddressId(1L)
            .deliveryRouteId(1L)
            .estimatedTravelTime(1)
            .deliveryTruckId(1L)
            .receiverId(1L)
            .orderTruckingNumber(1L);
    }

    public static Delivery getDeliverySample2() {
        return new Delivery()
            .id("id2")
            .orderId(2L)
            .deliveryAddressId(2L)
            .deliveryRouteId(2L)
            .estimatedTravelTime(2)
            .deliveryTruckId(2L)
            .receiverId(2L)
            .orderTruckingNumber(2L);
    }

    public static Delivery getDeliveryRandomSampleGenerator() {
        return new Delivery()
            .id(UUID.randomUUID().toString())
            .orderId(longCount.incrementAndGet())
            .deliveryAddressId(longCount.incrementAndGet())
            .deliveryRouteId(longCount.incrementAndGet())
            .estimatedTravelTime(intCount.incrementAndGet())
            .deliveryTruckId(longCount.incrementAndGet())
            .receiverId(longCount.incrementAndGet())
            .orderTruckingNumber(longCount.incrementAndGet());
    }
}

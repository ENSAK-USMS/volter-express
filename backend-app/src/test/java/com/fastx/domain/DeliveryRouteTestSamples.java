package com.fastx.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class DeliveryRouteTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static DeliveryRoute getDeliveryRouteSample1() {
        return new DeliveryRoute().id("id1").deliveryRouteId(1L).estimatedTravelTime(1).specialInstructions("specialInstructions1");
    }

    public static DeliveryRoute getDeliveryRouteSample2() {
        return new DeliveryRoute().id("id2").deliveryRouteId(2L).estimatedTravelTime(2).specialInstructions("specialInstructions2");
    }

    public static DeliveryRoute getDeliveryRouteRandomSampleGenerator() {
        return new DeliveryRoute()
            .id(UUID.randomUUID().toString())
            .deliveryRouteId(longCount.incrementAndGet())
            .estimatedTravelTime(intCount.incrementAndGet())
            .specialInstructions(UUID.randomUUID().toString());
    }
}

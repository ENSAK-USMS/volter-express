package com.fastx.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class DeliveryTruckTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static DeliveryTruck getDeliveryTruckSample1() {
        return new DeliveryTruck()
            .id("id1")
            .deliveryTruckId(1L)
            .currentLocation(1)
            .status("status1")
            .driverName("driverName1")
            .driverContact("driverContact1")
            .licensePlate("licensePlate1");
    }

    public static DeliveryTruck getDeliveryTruckSample2() {
        return new DeliveryTruck()
            .id("id2")
            .deliveryTruckId(2L)
            .currentLocation(2)
            .status("status2")
            .driverName("driverName2")
            .driverContact("driverContact2")
            .licensePlate("licensePlate2");
    }

    public static DeliveryTruck getDeliveryTruckRandomSampleGenerator() {
        return new DeliveryTruck()
            .id(UUID.randomUUID().toString())
            .deliveryTruckId(longCount.incrementAndGet())
            .currentLocation(intCount.incrementAndGet())
            .status(UUID.randomUUID().toString())
            .driverName(UUID.randomUUID().toString())
            .driverContact(UUID.randomUUID().toString())
            .licensePlate(UUID.randomUUID().toString());
    }
}

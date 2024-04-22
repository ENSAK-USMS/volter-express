package com.fastx.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ReceiverTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Receiver getReceiverSample1() {
        return new Receiver()
            .id("id1")
            .name("name1")
            .country("country1")
            .city("city1")
            .email("email1")
            .phone("phone1")
            .streetName("streetName1")
            .location(1L);
    }

    public static Receiver getReceiverSample2() {
        return new Receiver()
            .id("id2")
            .name("name2")
            .country("country2")
            .city("city2")
            .email("email2")
            .phone("phone2")
            .streetName("streetName2")
            .location(2L);
    }

    public static Receiver getReceiverRandomSampleGenerator() {
        return new Receiver()
            .id(UUID.randomUUID().toString())
            .name(UUID.randomUUID().toString())
            .country(UUID.randomUUID().toString())
            .city(UUID.randomUUID().toString())
            .email(UUID.randomUUID().toString())
            .phone(UUID.randomUUID().toString())
            .streetName(UUID.randomUUID().toString())
            .location(longCount.incrementAndGet());
    }
}

package com.fastx.domain;

import java.util.UUID;

public class ProfileTestSamples {

    public static Profile getProfileSample1() {
        return new Profile()
            .id("id1")
            .phone("phone1")
            .companyName("companyName1")
            .companyAddress("companyAddress1")
            .companyCity("companyCity1")
            .companyPostalCode("companyPostalCode1")
            .companyCountry("companyCountry1")
            .country("country1")
            .city("city1")
            .streetName("streetName1");
    }

    public static Profile getProfileSample2() {
        return new Profile()
            .id("id2")
            .phone("phone2")
            .companyName("companyName2")
            .companyAddress("companyAddress2")
            .companyCity("companyCity2")
            .companyPostalCode("companyPostalCode2")
            .companyCountry("companyCountry2")
            .country("country2")
            .city("city2")
            .streetName("streetName2");
    }

    public static Profile getProfileRandomSampleGenerator() {
        return new Profile()
            .id(UUID.randomUUID().toString())
            .phone(UUID.randomUUID().toString())
            .companyName(UUID.randomUUID().toString())
            .companyAddress(UUID.randomUUID().toString())
            .companyCity(UUID.randomUUID().toString())
            .companyPostalCode(UUID.randomUUID().toString())
            .companyCountry(UUID.randomUUID().toString())
            .country(UUID.randomUUID().toString())
            .city(UUID.randomUUID().toString())
            .streetName(UUID.randomUUID().toString());
    }
}

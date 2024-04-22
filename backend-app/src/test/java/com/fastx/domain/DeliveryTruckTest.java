package com.fastx.domain;

import static com.fastx.domain.DeliveryTruckTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.fastx.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DeliveryTruckTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DeliveryTruck.class);
        DeliveryTruck deliveryTruck1 = getDeliveryTruckSample1();
        DeliveryTruck deliveryTruck2 = new DeliveryTruck();
        assertThat(deliveryTruck1).isNotEqualTo(deliveryTruck2);

        deliveryTruck2.setId(deliveryTruck1.getId());
        assertThat(deliveryTruck1).isEqualTo(deliveryTruck2);

        deliveryTruck2 = getDeliveryTruckSample2();
        assertThat(deliveryTruck1).isNotEqualTo(deliveryTruck2);
    }
}

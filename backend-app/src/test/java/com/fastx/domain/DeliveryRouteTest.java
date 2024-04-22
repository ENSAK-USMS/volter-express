package com.fastx.domain;

import static com.fastx.domain.DeliveryRouteTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.fastx.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DeliveryRouteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DeliveryRoute.class);
        DeliveryRoute deliveryRoute1 = getDeliveryRouteSample1();
        DeliveryRoute deliveryRoute2 = new DeliveryRoute();
        assertThat(deliveryRoute1).isNotEqualTo(deliveryRoute2);

        deliveryRoute2.setId(deliveryRoute1.getId());
        assertThat(deliveryRoute1).isEqualTo(deliveryRoute2);

        deliveryRoute2 = getDeliveryRouteSample2();
        assertThat(deliveryRoute1).isNotEqualTo(deliveryRoute2);
    }
}

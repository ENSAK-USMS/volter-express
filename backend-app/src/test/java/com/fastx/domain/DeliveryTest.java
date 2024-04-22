package com.fastx.domain;

import static com.fastx.domain.DeliveryTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.fastx.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DeliveryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Delivery.class);
        Delivery delivery1 = getDeliverySample1();
        Delivery delivery2 = new Delivery();
        assertThat(delivery1).isNotEqualTo(delivery2);

        delivery2.setId(delivery1.getId());
        assertThat(delivery1).isEqualTo(delivery2);

        delivery2 = getDeliverySample2();
        assertThat(delivery1).isNotEqualTo(delivery2);
    }
}

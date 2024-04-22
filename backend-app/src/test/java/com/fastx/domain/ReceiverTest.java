package com.fastx.domain;

import static com.fastx.domain.ReceiverTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.fastx.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ReceiverTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Receiver.class);
        Receiver receiver1 = getReceiverSample1();
        Receiver receiver2 = new Receiver();
        assertThat(receiver1).isNotEqualTo(receiver2);

        receiver2.setId(receiver1.getId());
        assertThat(receiver1).isEqualTo(receiver2);

        receiver2 = getReceiverSample2();
        assertThat(receiver1).isNotEqualTo(receiver2);
    }
}

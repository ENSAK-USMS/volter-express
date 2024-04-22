package com.fastx.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fastx.IntegrationTest;
import com.fastx.domain.Delivery;
import com.fastx.repository.DeliveryRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the {@link DeliveryResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DeliveryResourceIT {

    private static final Instant DEFAULT_DELIVERY_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DELIVERY_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_ORDER_ID = 1L;
    private static final Long UPDATED_ORDER_ID = 2L;

    private static final Long DEFAULT_DELIVERY_ADDRESS_ID = 1L;
    private static final Long UPDATED_DELIVERY_ADDRESS_ID = 2L;

    private static final Long DEFAULT_DELIVERY_ROUTE_ID = 1L;
    private static final Long UPDATED_DELIVERY_ROUTE_ID = 2L;

    private static final Integer DEFAULT_ESTIMATED_TRAVEL_TIME = 1;
    private static final Integer UPDATED_ESTIMATED_TRAVEL_TIME = 2;

    private static final Long DEFAULT_DELIVERY_TRUCK_ID = 1L;
    private static final Long UPDATED_DELIVERY_TRUCK_ID = 2L;

    private static final Long DEFAULT_RECEIVER_ID = 1L;
    private static final Long UPDATED_RECEIVER_ID = 2L;

    private static final Long DEFAULT_ORDER_TRUCKING_NUMBER = 1L;
    private static final Long UPDATED_ORDER_TRUCKING_NUMBER = 2L;

    private static final String ENTITY_API_URL = "/api/deliveries";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private MockMvc restDeliveryMockMvc;

    private Delivery delivery;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Delivery createEntity() {
        Delivery delivery = new Delivery()
            .deliveryDate(DEFAULT_DELIVERY_DATE)
            .orderId(DEFAULT_ORDER_ID)
            .deliveryAddressId(DEFAULT_DELIVERY_ADDRESS_ID)
            .deliveryRouteId(DEFAULT_DELIVERY_ROUTE_ID)
            .estimatedTravelTime(DEFAULT_ESTIMATED_TRAVEL_TIME)
            .deliveryTruckId(DEFAULT_DELIVERY_TRUCK_ID)
            .receiverId(DEFAULT_RECEIVER_ID)
            .orderTruckingNumber(DEFAULT_ORDER_TRUCKING_NUMBER);
        return delivery;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Delivery createUpdatedEntity() {
        Delivery delivery = new Delivery()
            .deliveryDate(UPDATED_DELIVERY_DATE)
            .orderId(UPDATED_ORDER_ID)
            .deliveryAddressId(UPDATED_DELIVERY_ADDRESS_ID)
            .deliveryRouteId(UPDATED_DELIVERY_ROUTE_ID)
            .estimatedTravelTime(UPDATED_ESTIMATED_TRAVEL_TIME)
            .deliveryTruckId(UPDATED_DELIVERY_TRUCK_ID)
            .receiverId(UPDATED_RECEIVER_ID)
            .orderTruckingNumber(UPDATED_ORDER_TRUCKING_NUMBER);
        return delivery;
    }

    @BeforeEach
    public void initTest() {
        deliveryRepository.deleteAll();
        delivery = createEntity();
    }

    @Test
    void createDelivery() throws Exception {
        int databaseSizeBeforeCreate = deliveryRepository.findAll().size();
        // Create the Delivery
        restDeliveryMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isCreated());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeCreate + 1);
        Delivery testDelivery = deliveryList.get(deliveryList.size() - 1);
        assertThat(testDelivery.getDeliveryDate()).isEqualTo(DEFAULT_DELIVERY_DATE);
        assertThat(testDelivery.getOrderId()).isEqualTo(DEFAULT_ORDER_ID);
        assertThat(testDelivery.getDeliveryAddressId()).isEqualTo(DEFAULT_DELIVERY_ADDRESS_ID);
        assertThat(testDelivery.getDeliveryRouteId()).isEqualTo(DEFAULT_DELIVERY_ROUTE_ID);
        assertThat(testDelivery.getEstimatedTravelTime()).isEqualTo(DEFAULT_ESTIMATED_TRAVEL_TIME);
        assertThat(testDelivery.getDeliveryTruckId()).isEqualTo(DEFAULT_DELIVERY_TRUCK_ID);
        assertThat(testDelivery.getReceiverId()).isEqualTo(DEFAULT_RECEIVER_ID);
        assertThat(testDelivery.getOrderTruckingNumber()).isEqualTo(DEFAULT_ORDER_TRUCKING_NUMBER);
    }

    @Test
    void createDeliveryWithExistingId() throws Exception {
        // Create the Delivery with an existing ID
        delivery.setId("existing_id");

        int databaseSizeBeforeCreate = deliveryRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isBadRequest());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllDeliveries() throws Exception {
        // Initialize the database
        deliveryRepository.save(delivery);

        // Get all the deliveryList
        restDeliveryMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(delivery.getId())))
            .andExpect(jsonPath("$.[*].deliveryDate").value(hasItem(DEFAULT_DELIVERY_DATE.toString())))
            .andExpect(jsonPath("$.[*].orderId").value(hasItem(DEFAULT_ORDER_ID.intValue())))
            .andExpect(jsonPath("$.[*].deliveryAddressId").value(hasItem(DEFAULT_DELIVERY_ADDRESS_ID.intValue())))
            .andExpect(jsonPath("$.[*].deliveryRouteId").value(hasItem(DEFAULT_DELIVERY_ROUTE_ID.intValue())))
            .andExpect(jsonPath("$.[*].estimatedTravelTime").value(hasItem(DEFAULT_ESTIMATED_TRAVEL_TIME)))
            .andExpect(jsonPath("$.[*].deliveryTruckId").value(hasItem(DEFAULT_DELIVERY_TRUCK_ID.intValue())))
            .andExpect(jsonPath("$.[*].receiverId").value(hasItem(DEFAULT_RECEIVER_ID.intValue())))
            .andExpect(jsonPath("$.[*].orderTruckingNumber").value(hasItem(DEFAULT_ORDER_TRUCKING_NUMBER.intValue())));
    }

    @Test
    void getDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.save(delivery);

        // Get the delivery
        restDeliveryMockMvc
            .perform(get(ENTITY_API_URL_ID, delivery.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(delivery.getId()))
            .andExpect(jsonPath("$.deliveryDate").value(DEFAULT_DELIVERY_DATE.toString()))
            .andExpect(jsonPath("$.orderId").value(DEFAULT_ORDER_ID.intValue()))
            .andExpect(jsonPath("$.deliveryAddressId").value(DEFAULT_DELIVERY_ADDRESS_ID.intValue()))
            .andExpect(jsonPath("$.deliveryRouteId").value(DEFAULT_DELIVERY_ROUTE_ID.intValue()))
            .andExpect(jsonPath("$.estimatedTravelTime").value(DEFAULT_ESTIMATED_TRAVEL_TIME))
            .andExpect(jsonPath("$.deliveryTruckId").value(DEFAULT_DELIVERY_TRUCK_ID.intValue()))
            .andExpect(jsonPath("$.receiverId").value(DEFAULT_RECEIVER_ID.intValue()))
            .andExpect(jsonPath("$.orderTruckingNumber").value(DEFAULT_ORDER_TRUCKING_NUMBER.intValue()));
    }

    @Test
    void getNonExistingDelivery() throws Exception {
        // Get the delivery
        restDeliveryMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.save(delivery);

        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();

        // Update the delivery
        Delivery updatedDelivery = deliveryRepository.findById(delivery.getId()).orElseThrow();
        updatedDelivery
            .deliveryDate(UPDATED_DELIVERY_DATE)
            .orderId(UPDATED_ORDER_ID)
            .deliveryAddressId(UPDATED_DELIVERY_ADDRESS_ID)
            .deliveryRouteId(UPDATED_DELIVERY_ROUTE_ID)
            .estimatedTravelTime(UPDATED_ESTIMATED_TRAVEL_TIME)
            .deliveryTruckId(UPDATED_DELIVERY_TRUCK_ID)
            .receiverId(UPDATED_RECEIVER_ID)
            .orderTruckingNumber(UPDATED_ORDER_TRUCKING_NUMBER);

        restDeliveryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDelivery.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDelivery))
            )
            .andExpect(status().isOk());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
        Delivery testDelivery = deliveryList.get(deliveryList.size() - 1);
        assertThat(testDelivery.getDeliveryDate()).isEqualTo(UPDATED_DELIVERY_DATE);
        assertThat(testDelivery.getOrderId()).isEqualTo(UPDATED_ORDER_ID);
        assertThat(testDelivery.getDeliveryAddressId()).isEqualTo(UPDATED_DELIVERY_ADDRESS_ID);
        assertThat(testDelivery.getDeliveryRouteId()).isEqualTo(UPDATED_DELIVERY_ROUTE_ID);
        assertThat(testDelivery.getEstimatedTravelTime()).isEqualTo(UPDATED_ESTIMATED_TRAVEL_TIME);
        assertThat(testDelivery.getDeliveryTruckId()).isEqualTo(UPDATED_DELIVERY_TRUCK_ID);
        assertThat(testDelivery.getReceiverId()).isEqualTo(UPDATED_RECEIVER_ID);
        assertThat(testDelivery.getOrderTruckingNumber()).isEqualTo(UPDATED_ORDER_TRUCKING_NUMBER);
    }

    @Test
    void putNonExistingDelivery() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();
        delivery.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, delivery.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(delivery))
            )
            .andExpect(status().isBadRequest());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchDelivery() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();
        delivery.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(delivery))
            )
            .andExpect(status().isBadRequest());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamDelivery() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();
        delivery.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateDeliveryWithPatch() throws Exception {
        // Initialize the database
        deliveryRepository.save(delivery);

        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();

        // Update the delivery using partial update
        Delivery partialUpdatedDelivery = new Delivery();
        partialUpdatedDelivery.setId(delivery.getId());

        partialUpdatedDelivery
            .deliveryAddressId(UPDATED_DELIVERY_ADDRESS_ID)
            .deliveryRouteId(UPDATED_DELIVERY_ROUTE_ID)
            .estimatedTravelTime(UPDATED_ESTIMATED_TRAVEL_TIME);

        restDeliveryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDelivery.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDelivery))
            )
            .andExpect(status().isOk());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
        Delivery testDelivery = deliveryList.get(deliveryList.size() - 1);
        assertThat(testDelivery.getDeliveryDate()).isEqualTo(DEFAULT_DELIVERY_DATE);
        assertThat(testDelivery.getOrderId()).isEqualTo(DEFAULT_ORDER_ID);
        assertThat(testDelivery.getDeliveryAddressId()).isEqualTo(UPDATED_DELIVERY_ADDRESS_ID);
        assertThat(testDelivery.getDeliveryRouteId()).isEqualTo(UPDATED_DELIVERY_ROUTE_ID);
        assertThat(testDelivery.getEstimatedTravelTime()).isEqualTo(UPDATED_ESTIMATED_TRAVEL_TIME);
        assertThat(testDelivery.getDeliveryTruckId()).isEqualTo(DEFAULT_DELIVERY_TRUCK_ID);
        assertThat(testDelivery.getReceiverId()).isEqualTo(DEFAULT_RECEIVER_ID);
        assertThat(testDelivery.getOrderTruckingNumber()).isEqualTo(DEFAULT_ORDER_TRUCKING_NUMBER);
    }

    @Test
    void fullUpdateDeliveryWithPatch() throws Exception {
        // Initialize the database
        deliveryRepository.save(delivery);

        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();

        // Update the delivery using partial update
        Delivery partialUpdatedDelivery = new Delivery();
        partialUpdatedDelivery.setId(delivery.getId());

        partialUpdatedDelivery
            .deliveryDate(UPDATED_DELIVERY_DATE)
            .orderId(UPDATED_ORDER_ID)
            .deliveryAddressId(UPDATED_DELIVERY_ADDRESS_ID)
            .deliveryRouteId(UPDATED_DELIVERY_ROUTE_ID)
            .estimatedTravelTime(UPDATED_ESTIMATED_TRAVEL_TIME)
            .deliveryTruckId(UPDATED_DELIVERY_TRUCK_ID)
            .receiverId(UPDATED_RECEIVER_ID)
            .orderTruckingNumber(UPDATED_ORDER_TRUCKING_NUMBER);

        restDeliveryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDelivery.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDelivery))
            )
            .andExpect(status().isOk());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
        Delivery testDelivery = deliveryList.get(deliveryList.size() - 1);
        assertThat(testDelivery.getDeliveryDate()).isEqualTo(UPDATED_DELIVERY_DATE);
        assertThat(testDelivery.getOrderId()).isEqualTo(UPDATED_ORDER_ID);
        assertThat(testDelivery.getDeliveryAddressId()).isEqualTo(UPDATED_DELIVERY_ADDRESS_ID);
        assertThat(testDelivery.getDeliveryRouteId()).isEqualTo(UPDATED_DELIVERY_ROUTE_ID);
        assertThat(testDelivery.getEstimatedTravelTime()).isEqualTo(UPDATED_ESTIMATED_TRAVEL_TIME);
        assertThat(testDelivery.getDeliveryTruckId()).isEqualTo(UPDATED_DELIVERY_TRUCK_ID);
        assertThat(testDelivery.getReceiverId()).isEqualTo(UPDATED_RECEIVER_ID);
        assertThat(testDelivery.getOrderTruckingNumber()).isEqualTo(UPDATED_ORDER_TRUCKING_NUMBER);
    }

    @Test
    void patchNonExistingDelivery() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();
        delivery.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, delivery.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(delivery))
            )
            .andExpect(status().isBadRequest());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchDelivery() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();
        delivery.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(delivery))
            )
            .andExpect(status().isBadRequest());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamDelivery() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();
        delivery.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.save(delivery);

        int databaseSizeBeforeDelete = deliveryRepository.findAll().size();

        // Delete the delivery
        restDeliveryMockMvc
            .perform(delete(ENTITY_API_URL_ID, delivery.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

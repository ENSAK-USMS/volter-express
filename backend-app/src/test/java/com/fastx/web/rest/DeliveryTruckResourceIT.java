package com.fastx.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fastx.IntegrationTest;
import com.fastx.domain.DeliveryTruck;
import com.fastx.repository.DeliveryTruckRepository;
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
 * Integration tests for the {@link DeliveryTruckResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DeliveryTruckResourceIT {

    private static final Long DEFAULT_DELIVERY_TRUCK_ID = 1L;
    private static final Long UPDATED_DELIVERY_TRUCK_ID = 2L;

    private static final Float DEFAULT_CAPACITY_KG = 1F;
    private static final Float UPDATED_CAPACITY_KG = 2F;

    private static final Integer DEFAULT_CURRENT_LOCATION = 1;
    private static final Integer UPDATED_CURRENT_LOCATION = 2;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DRIVER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVER_CONTACT = "AAAAAAAAAA";
    private static final String UPDATED_DRIVER_CONTACT = "BBBBBBBBBB";

    private static final String DEFAULT_LICENSE_PLATE = "AAAAAAAAAA";
    private static final String UPDATED_LICENSE_PLATE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/delivery-trucks";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private DeliveryTruckRepository deliveryTruckRepository;

    @Autowired
    private MockMvc restDeliveryTruckMockMvc;

    private DeliveryTruck deliveryTruck;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DeliveryTruck createEntity() {
        DeliveryTruck deliveryTruck = new DeliveryTruck()
            .deliveryTruckId(DEFAULT_DELIVERY_TRUCK_ID)
            .capacityKg(DEFAULT_CAPACITY_KG)
            .currentLocation(DEFAULT_CURRENT_LOCATION)
            .status(DEFAULT_STATUS)
            .driverName(DEFAULT_DRIVER_NAME)
            .driverContact(DEFAULT_DRIVER_CONTACT)
            .licensePlate(DEFAULT_LICENSE_PLATE);
        return deliveryTruck;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DeliveryTruck createUpdatedEntity() {
        DeliveryTruck deliveryTruck = new DeliveryTruck()
            .deliveryTruckId(UPDATED_DELIVERY_TRUCK_ID)
            .capacityKg(UPDATED_CAPACITY_KG)
            .currentLocation(UPDATED_CURRENT_LOCATION)
            .status(UPDATED_STATUS)
            .driverName(UPDATED_DRIVER_NAME)
            .driverContact(UPDATED_DRIVER_CONTACT)
            .licensePlate(UPDATED_LICENSE_PLATE);
        return deliveryTruck;
    }

    @BeforeEach
    public void initTest() {
        deliveryTruckRepository.deleteAll();
        deliveryTruck = createEntity();
    }

    @Test
    void createDeliveryTruck() throws Exception {
        int databaseSizeBeforeCreate = deliveryTruckRepository.findAll().size();
        // Create the DeliveryTruck
        restDeliveryTruckMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(deliveryTruck)))
            .andExpect(status().isCreated());

        // Validate the DeliveryTruck in the database
        List<DeliveryTruck> deliveryTruckList = deliveryTruckRepository.findAll();
        assertThat(deliveryTruckList).hasSize(databaseSizeBeforeCreate + 1);
        DeliveryTruck testDeliveryTruck = deliveryTruckList.get(deliveryTruckList.size() - 1);
        assertThat(testDeliveryTruck.getDeliveryTruckId()).isEqualTo(DEFAULT_DELIVERY_TRUCK_ID);
        assertThat(testDeliveryTruck.getCapacityKg()).isEqualTo(DEFAULT_CAPACITY_KG);
        assertThat(testDeliveryTruck.getCurrentLocation()).isEqualTo(DEFAULT_CURRENT_LOCATION);
        assertThat(testDeliveryTruck.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testDeliveryTruck.getDriverName()).isEqualTo(DEFAULT_DRIVER_NAME);
        assertThat(testDeliveryTruck.getDriverContact()).isEqualTo(DEFAULT_DRIVER_CONTACT);
        assertThat(testDeliveryTruck.getLicensePlate()).isEqualTo(DEFAULT_LICENSE_PLATE);
    }

    @Test
    void createDeliveryTruckWithExistingId() throws Exception {
        // Create the DeliveryTruck with an existing ID
        deliveryTruck.setId("existing_id");

        int databaseSizeBeforeCreate = deliveryTruckRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryTruckMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(deliveryTruck)))
            .andExpect(status().isBadRequest());

        // Validate the DeliveryTruck in the database
        List<DeliveryTruck> deliveryTruckList = deliveryTruckRepository.findAll();
        assertThat(deliveryTruckList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkDeliveryTruckIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = deliveryTruckRepository.findAll().size();
        // set the field null
        deliveryTruck.setDeliveryTruckId(null);

        // Create the DeliveryTruck, which fails.

        restDeliveryTruckMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(deliveryTruck)))
            .andExpect(status().isBadRequest());

        List<DeliveryTruck> deliveryTruckList = deliveryTruckRepository.findAll();
        assertThat(deliveryTruckList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllDeliveryTrucks() throws Exception {
        // Initialize the database
        deliveryTruckRepository.save(deliveryTruck);

        // Get all the deliveryTruckList
        restDeliveryTruckMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliveryTruck.getId())))
            .andExpect(jsonPath("$.[*].deliveryTruckId").value(hasItem(DEFAULT_DELIVERY_TRUCK_ID.intValue())))
            .andExpect(jsonPath("$.[*].capacityKg").value(hasItem(DEFAULT_CAPACITY_KG.doubleValue())))
            .andExpect(jsonPath("$.[*].currentLocation").value(hasItem(DEFAULT_CURRENT_LOCATION)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].driverName").value(hasItem(DEFAULT_DRIVER_NAME)))
            .andExpect(jsonPath("$.[*].driverContact").value(hasItem(DEFAULT_DRIVER_CONTACT)))
            .andExpect(jsonPath("$.[*].licensePlate").value(hasItem(DEFAULT_LICENSE_PLATE)));
    }

    @Test
    void getDeliveryTruck() throws Exception {
        // Initialize the database
        deliveryTruckRepository.save(deliveryTruck);

        // Get the deliveryTruck
        restDeliveryTruckMockMvc
            .perform(get(ENTITY_API_URL_ID, deliveryTruck.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(deliveryTruck.getId()))
            .andExpect(jsonPath("$.deliveryTruckId").value(DEFAULT_DELIVERY_TRUCK_ID.intValue()))
            .andExpect(jsonPath("$.capacityKg").value(DEFAULT_CAPACITY_KG.doubleValue()))
            .andExpect(jsonPath("$.currentLocation").value(DEFAULT_CURRENT_LOCATION))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.driverName").value(DEFAULT_DRIVER_NAME))
            .andExpect(jsonPath("$.driverContact").value(DEFAULT_DRIVER_CONTACT))
            .andExpect(jsonPath("$.licensePlate").value(DEFAULT_LICENSE_PLATE));
    }

    @Test
    void getNonExistingDeliveryTruck() throws Exception {
        // Get the deliveryTruck
        restDeliveryTruckMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingDeliveryTruck() throws Exception {
        // Initialize the database
        deliveryTruckRepository.save(deliveryTruck);

        int databaseSizeBeforeUpdate = deliveryTruckRepository.findAll().size();

        // Update the deliveryTruck
        DeliveryTruck updatedDeliveryTruck = deliveryTruckRepository.findById(deliveryTruck.getId()).orElseThrow();
        updatedDeliveryTruck
            .deliveryTruckId(UPDATED_DELIVERY_TRUCK_ID)
            .capacityKg(UPDATED_CAPACITY_KG)
            .currentLocation(UPDATED_CURRENT_LOCATION)
            .status(UPDATED_STATUS)
            .driverName(UPDATED_DRIVER_NAME)
            .driverContact(UPDATED_DRIVER_CONTACT)
            .licensePlate(UPDATED_LICENSE_PLATE);

        restDeliveryTruckMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDeliveryTruck.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDeliveryTruck))
            )
            .andExpect(status().isOk());

        // Validate the DeliveryTruck in the database
        List<DeliveryTruck> deliveryTruckList = deliveryTruckRepository.findAll();
        assertThat(deliveryTruckList).hasSize(databaseSizeBeforeUpdate);
        DeliveryTruck testDeliveryTruck = deliveryTruckList.get(deliveryTruckList.size() - 1);
        assertThat(testDeliveryTruck.getDeliveryTruckId()).isEqualTo(UPDATED_DELIVERY_TRUCK_ID);
        assertThat(testDeliveryTruck.getCapacityKg()).isEqualTo(UPDATED_CAPACITY_KG);
        assertThat(testDeliveryTruck.getCurrentLocation()).isEqualTo(UPDATED_CURRENT_LOCATION);
        assertThat(testDeliveryTruck.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testDeliveryTruck.getDriverName()).isEqualTo(UPDATED_DRIVER_NAME);
        assertThat(testDeliveryTruck.getDriverContact()).isEqualTo(UPDATED_DRIVER_CONTACT);
        assertThat(testDeliveryTruck.getLicensePlate()).isEqualTo(UPDATED_LICENSE_PLATE);
    }

    @Test
    void putNonExistingDeliveryTruck() throws Exception {
        int databaseSizeBeforeUpdate = deliveryTruckRepository.findAll().size();
        deliveryTruck.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryTruckMockMvc
            .perform(
                put(ENTITY_API_URL_ID, deliveryTruck.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(deliveryTruck))
            )
            .andExpect(status().isBadRequest());

        // Validate the DeliveryTruck in the database
        List<DeliveryTruck> deliveryTruckList = deliveryTruckRepository.findAll();
        assertThat(deliveryTruckList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchDeliveryTruck() throws Exception {
        int databaseSizeBeforeUpdate = deliveryTruckRepository.findAll().size();
        deliveryTruck.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryTruckMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(deliveryTruck))
            )
            .andExpect(status().isBadRequest());

        // Validate the DeliveryTruck in the database
        List<DeliveryTruck> deliveryTruckList = deliveryTruckRepository.findAll();
        assertThat(deliveryTruckList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamDeliveryTruck() throws Exception {
        int databaseSizeBeforeUpdate = deliveryTruckRepository.findAll().size();
        deliveryTruck.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryTruckMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(deliveryTruck)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DeliveryTruck in the database
        List<DeliveryTruck> deliveryTruckList = deliveryTruckRepository.findAll();
        assertThat(deliveryTruckList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateDeliveryTruckWithPatch() throws Exception {
        // Initialize the database
        deliveryTruckRepository.save(deliveryTruck);

        int databaseSizeBeforeUpdate = deliveryTruckRepository.findAll().size();

        // Update the deliveryTruck using partial update
        DeliveryTruck partialUpdatedDeliveryTruck = new DeliveryTruck();
        partialUpdatedDeliveryTruck.setId(deliveryTruck.getId());

        partialUpdatedDeliveryTruck.capacityKg(UPDATED_CAPACITY_KG).status(UPDATED_STATUS).licensePlate(UPDATED_LICENSE_PLATE);

        restDeliveryTruckMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDeliveryTruck.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDeliveryTruck))
            )
            .andExpect(status().isOk());

        // Validate the DeliveryTruck in the database
        List<DeliveryTruck> deliveryTruckList = deliveryTruckRepository.findAll();
        assertThat(deliveryTruckList).hasSize(databaseSizeBeforeUpdate);
        DeliveryTruck testDeliveryTruck = deliveryTruckList.get(deliveryTruckList.size() - 1);
        assertThat(testDeliveryTruck.getDeliveryTruckId()).isEqualTo(DEFAULT_DELIVERY_TRUCK_ID);
        assertThat(testDeliveryTruck.getCapacityKg()).isEqualTo(UPDATED_CAPACITY_KG);
        assertThat(testDeliveryTruck.getCurrentLocation()).isEqualTo(DEFAULT_CURRENT_LOCATION);
        assertThat(testDeliveryTruck.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testDeliveryTruck.getDriverName()).isEqualTo(DEFAULT_DRIVER_NAME);
        assertThat(testDeliveryTruck.getDriverContact()).isEqualTo(DEFAULT_DRIVER_CONTACT);
        assertThat(testDeliveryTruck.getLicensePlate()).isEqualTo(UPDATED_LICENSE_PLATE);
    }

    @Test
    void fullUpdateDeliveryTruckWithPatch() throws Exception {
        // Initialize the database
        deliveryTruckRepository.save(deliveryTruck);

        int databaseSizeBeforeUpdate = deliveryTruckRepository.findAll().size();

        // Update the deliveryTruck using partial update
        DeliveryTruck partialUpdatedDeliveryTruck = new DeliveryTruck();
        partialUpdatedDeliveryTruck.setId(deliveryTruck.getId());

        partialUpdatedDeliveryTruck
            .deliveryTruckId(UPDATED_DELIVERY_TRUCK_ID)
            .capacityKg(UPDATED_CAPACITY_KG)
            .currentLocation(UPDATED_CURRENT_LOCATION)
            .status(UPDATED_STATUS)
            .driverName(UPDATED_DRIVER_NAME)
            .driverContact(UPDATED_DRIVER_CONTACT)
            .licensePlate(UPDATED_LICENSE_PLATE);

        restDeliveryTruckMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDeliveryTruck.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDeliveryTruck))
            )
            .andExpect(status().isOk());

        // Validate the DeliveryTruck in the database
        List<DeliveryTruck> deliveryTruckList = deliveryTruckRepository.findAll();
        assertThat(deliveryTruckList).hasSize(databaseSizeBeforeUpdate);
        DeliveryTruck testDeliveryTruck = deliveryTruckList.get(deliveryTruckList.size() - 1);
        assertThat(testDeliveryTruck.getDeliveryTruckId()).isEqualTo(UPDATED_DELIVERY_TRUCK_ID);
        assertThat(testDeliveryTruck.getCapacityKg()).isEqualTo(UPDATED_CAPACITY_KG);
        assertThat(testDeliveryTruck.getCurrentLocation()).isEqualTo(UPDATED_CURRENT_LOCATION);
        assertThat(testDeliveryTruck.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testDeliveryTruck.getDriverName()).isEqualTo(UPDATED_DRIVER_NAME);
        assertThat(testDeliveryTruck.getDriverContact()).isEqualTo(UPDATED_DRIVER_CONTACT);
        assertThat(testDeliveryTruck.getLicensePlate()).isEqualTo(UPDATED_LICENSE_PLATE);
    }

    @Test
    void patchNonExistingDeliveryTruck() throws Exception {
        int databaseSizeBeforeUpdate = deliveryTruckRepository.findAll().size();
        deliveryTruck.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryTruckMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, deliveryTruck.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(deliveryTruck))
            )
            .andExpect(status().isBadRequest());

        // Validate the DeliveryTruck in the database
        List<DeliveryTruck> deliveryTruckList = deliveryTruckRepository.findAll();
        assertThat(deliveryTruckList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchDeliveryTruck() throws Exception {
        int databaseSizeBeforeUpdate = deliveryTruckRepository.findAll().size();
        deliveryTruck.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryTruckMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(deliveryTruck))
            )
            .andExpect(status().isBadRequest());

        // Validate the DeliveryTruck in the database
        List<DeliveryTruck> deliveryTruckList = deliveryTruckRepository.findAll();
        assertThat(deliveryTruckList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamDeliveryTruck() throws Exception {
        int databaseSizeBeforeUpdate = deliveryTruckRepository.findAll().size();
        deliveryTruck.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryTruckMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(deliveryTruck))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DeliveryTruck in the database
        List<DeliveryTruck> deliveryTruckList = deliveryTruckRepository.findAll();
        assertThat(deliveryTruckList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteDeliveryTruck() throws Exception {
        // Initialize the database
        deliveryTruckRepository.save(deliveryTruck);

        int databaseSizeBeforeDelete = deliveryTruckRepository.findAll().size();

        // Delete the deliveryTruck
        restDeliveryTruckMockMvc
            .perform(delete(ENTITY_API_URL_ID, deliveryTruck.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DeliveryTruck> deliveryTruckList = deliveryTruckRepository.findAll();
        assertThat(deliveryTruckList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

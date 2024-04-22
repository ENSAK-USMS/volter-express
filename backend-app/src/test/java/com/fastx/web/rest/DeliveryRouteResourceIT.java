package com.fastx.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fastx.IntegrationTest;
import com.fastx.domain.DeliveryRoute;
import com.fastx.repository.DeliveryRouteRepository;
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
 * Integration tests for the {@link DeliveryRouteResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DeliveryRouteResourceIT {

    private static final Long DEFAULT_DELIVERY_ROUTE_ID = 1L;
    private static final Long UPDATED_DELIVERY_ROUTE_ID = 2L;

    private static final Integer DEFAULT_ESTIMATED_TRAVEL_TIME = 1;
    private static final Integer UPDATED_ESTIMATED_TRAVEL_TIME = 2;

    private static final String DEFAULT_SPECIAL_INSTRUCTIONS = "AAAAAAAAAA";
    private static final String UPDATED_SPECIAL_INSTRUCTIONS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/delivery-routes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private DeliveryRouteRepository deliveryRouteRepository;

    @Autowired
    private MockMvc restDeliveryRouteMockMvc;

    private DeliveryRoute deliveryRoute;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DeliveryRoute createEntity() {
        DeliveryRoute deliveryRoute = new DeliveryRoute()
            .deliveryRouteId(DEFAULT_DELIVERY_ROUTE_ID)
            .estimatedTravelTime(DEFAULT_ESTIMATED_TRAVEL_TIME)
            .specialInstructions(DEFAULT_SPECIAL_INSTRUCTIONS);
        return deliveryRoute;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DeliveryRoute createUpdatedEntity() {
        DeliveryRoute deliveryRoute = new DeliveryRoute()
            .deliveryRouteId(UPDATED_DELIVERY_ROUTE_ID)
            .estimatedTravelTime(UPDATED_ESTIMATED_TRAVEL_TIME)
            .specialInstructions(UPDATED_SPECIAL_INSTRUCTIONS);
        return deliveryRoute;
    }

    @BeforeEach
    public void initTest() {
        deliveryRouteRepository.deleteAll();
        deliveryRoute = createEntity();
    }

    @Test
    void createDeliveryRoute() throws Exception {
        int databaseSizeBeforeCreate = deliveryRouteRepository.findAll().size();
        // Create the DeliveryRoute
        restDeliveryRouteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(deliveryRoute)))
            .andExpect(status().isCreated());

        // Validate the DeliveryRoute in the database
        List<DeliveryRoute> deliveryRouteList = deliveryRouteRepository.findAll();
        assertThat(deliveryRouteList).hasSize(databaseSizeBeforeCreate + 1);
        DeliveryRoute testDeliveryRoute = deliveryRouteList.get(deliveryRouteList.size() - 1);
        assertThat(testDeliveryRoute.getDeliveryRouteId()).isEqualTo(DEFAULT_DELIVERY_ROUTE_ID);
        assertThat(testDeliveryRoute.getEstimatedTravelTime()).isEqualTo(DEFAULT_ESTIMATED_TRAVEL_TIME);
        assertThat(testDeliveryRoute.getSpecialInstructions()).isEqualTo(DEFAULT_SPECIAL_INSTRUCTIONS);
    }

    @Test
    void createDeliveryRouteWithExistingId() throws Exception {
        // Create the DeliveryRoute with an existing ID
        deliveryRoute.setId("existing_id");

        int databaseSizeBeforeCreate = deliveryRouteRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryRouteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(deliveryRoute)))
            .andExpect(status().isBadRequest());

        // Validate the DeliveryRoute in the database
        List<DeliveryRoute> deliveryRouteList = deliveryRouteRepository.findAll();
        assertThat(deliveryRouteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllDeliveryRoutes() throws Exception {
        // Initialize the database
        deliveryRouteRepository.save(deliveryRoute);

        // Get all the deliveryRouteList
        restDeliveryRouteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliveryRoute.getId())))
            .andExpect(jsonPath("$.[*].deliveryRouteId").value(hasItem(DEFAULT_DELIVERY_ROUTE_ID.intValue())))
            .andExpect(jsonPath("$.[*].estimatedTravelTime").value(hasItem(DEFAULT_ESTIMATED_TRAVEL_TIME)))
            .andExpect(jsonPath("$.[*].specialInstructions").value(hasItem(DEFAULT_SPECIAL_INSTRUCTIONS)));
    }

    @Test
    void getDeliveryRoute() throws Exception {
        // Initialize the database
        deliveryRouteRepository.save(deliveryRoute);

        // Get the deliveryRoute
        restDeliveryRouteMockMvc
            .perform(get(ENTITY_API_URL_ID, deliveryRoute.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(deliveryRoute.getId()))
            .andExpect(jsonPath("$.deliveryRouteId").value(DEFAULT_DELIVERY_ROUTE_ID.intValue()))
            .andExpect(jsonPath("$.estimatedTravelTime").value(DEFAULT_ESTIMATED_TRAVEL_TIME))
            .andExpect(jsonPath("$.specialInstructions").value(DEFAULT_SPECIAL_INSTRUCTIONS));
    }

    @Test
    void getNonExistingDeliveryRoute() throws Exception {
        // Get the deliveryRoute
        restDeliveryRouteMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingDeliveryRoute() throws Exception {
        // Initialize the database
        deliveryRouteRepository.save(deliveryRoute);

        int databaseSizeBeforeUpdate = deliveryRouteRepository.findAll().size();

        // Update the deliveryRoute
        DeliveryRoute updatedDeliveryRoute = deliveryRouteRepository.findById(deliveryRoute.getId()).orElseThrow();
        updatedDeliveryRoute
            .deliveryRouteId(UPDATED_DELIVERY_ROUTE_ID)
            .estimatedTravelTime(UPDATED_ESTIMATED_TRAVEL_TIME)
            .specialInstructions(UPDATED_SPECIAL_INSTRUCTIONS);

        restDeliveryRouteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDeliveryRoute.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDeliveryRoute))
            )
            .andExpect(status().isOk());

        // Validate the DeliveryRoute in the database
        List<DeliveryRoute> deliveryRouteList = deliveryRouteRepository.findAll();
        assertThat(deliveryRouteList).hasSize(databaseSizeBeforeUpdate);
        DeliveryRoute testDeliveryRoute = deliveryRouteList.get(deliveryRouteList.size() - 1);
        assertThat(testDeliveryRoute.getDeliveryRouteId()).isEqualTo(UPDATED_DELIVERY_ROUTE_ID);
        assertThat(testDeliveryRoute.getEstimatedTravelTime()).isEqualTo(UPDATED_ESTIMATED_TRAVEL_TIME);
        assertThat(testDeliveryRoute.getSpecialInstructions()).isEqualTo(UPDATED_SPECIAL_INSTRUCTIONS);
    }

    @Test
    void putNonExistingDeliveryRoute() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRouteRepository.findAll().size();
        deliveryRoute.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryRouteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, deliveryRoute.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(deliveryRoute))
            )
            .andExpect(status().isBadRequest());

        // Validate the DeliveryRoute in the database
        List<DeliveryRoute> deliveryRouteList = deliveryRouteRepository.findAll();
        assertThat(deliveryRouteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchDeliveryRoute() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRouteRepository.findAll().size();
        deliveryRoute.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryRouteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(deliveryRoute))
            )
            .andExpect(status().isBadRequest());

        // Validate the DeliveryRoute in the database
        List<DeliveryRoute> deliveryRouteList = deliveryRouteRepository.findAll();
        assertThat(deliveryRouteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamDeliveryRoute() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRouteRepository.findAll().size();
        deliveryRoute.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryRouteMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(deliveryRoute)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DeliveryRoute in the database
        List<DeliveryRoute> deliveryRouteList = deliveryRouteRepository.findAll();
        assertThat(deliveryRouteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateDeliveryRouteWithPatch() throws Exception {
        // Initialize the database
        deliveryRouteRepository.save(deliveryRoute);

        int databaseSizeBeforeUpdate = deliveryRouteRepository.findAll().size();

        // Update the deliveryRoute using partial update
        DeliveryRoute partialUpdatedDeliveryRoute = new DeliveryRoute();
        partialUpdatedDeliveryRoute.setId(deliveryRoute.getId());

        partialUpdatedDeliveryRoute.specialInstructions(UPDATED_SPECIAL_INSTRUCTIONS);

        restDeliveryRouteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDeliveryRoute.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDeliveryRoute))
            )
            .andExpect(status().isOk());

        // Validate the DeliveryRoute in the database
        List<DeliveryRoute> deliveryRouteList = deliveryRouteRepository.findAll();
        assertThat(deliveryRouteList).hasSize(databaseSizeBeforeUpdate);
        DeliveryRoute testDeliveryRoute = deliveryRouteList.get(deliveryRouteList.size() - 1);
        assertThat(testDeliveryRoute.getDeliveryRouteId()).isEqualTo(DEFAULT_DELIVERY_ROUTE_ID);
        assertThat(testDeliveryRoute.getEstimatedTravelTime()).isEqualTo(DEFAULT_ESTIMATED_TRAVEL_TIME);
        assertThat(testDeliveryRoute.getSpecialInstructions()).isEqualTo(UPDATED_SPECIAL_INSTRUCTIONS);
    }

    @Test
    void fullUpdateDeliveryRouteWithPatch() throws Exception {
        // Initialize the database
        deliveryRouteRepository.save(deliveryRoute);

        int databaseSizeBeforeUpdate = deliveryRouteRepository.findAll().size();

        // Update the deliveryRoute using partial update
        DeliveryRoute partialUpdatedDeliveryRoute = new DeliveryRoute();
        partialUpdatedDeliveryRoute.setId(deliveryRoute.getId());

        partialUpdatedDeliveryRoute
            .deliveryRouteId(UPDATED_DELIVERY_ROUTE_ID)
            .estimatedTravelTime(UPDATED_ESTIMATED_TRAVEL_TIME)
            .specialInstructions(UPDATED_SPECIAL_INSTRUCTIONS);

        restDeliveryRouteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDeliveryRoute.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDeliveryRoute))
            )
            .andExpect(status().isOk());

        // Validate the DeliveryRoute in the database
        List<DeliveryRoute> deliveryRouteList = deliveryRouteRepository.findAll();
        assertThat(deliveryRouteList).hasSize(databaseSizeBeforeUpdate);
        DeliveryRoute testDeliveryRoute = deliveryRouteList.get(deliveryRouteList.size() - 1);
        assertThat(testDeliveryRoute.getDeliveryRouteId()).isEqualTo(UPDATED_DELIVERY_ROUTE_ID);
        assertThat(testDeliveryRoute.getEstimatedTravelTime()).isEqualTo(UPDATED_ESTIMATED_TRAVEL_TIME);
        assertThat(testDeliveryRoute.getSpecialInstructions()).isEqualTo(UPDATED_SPECIAL_INSTRUCTIONS);
    }

    @Test
    void patchNonExistingDeliveryRoute() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRouteRepository.findAll().size();
        deliveryRoute.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryRouteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, deliveryRoute.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(deliveryRoute))
            )
            .andExpect(status().isBadRequest());

        // Validate the DeliveryRoute in the database
        List<DeliveryRoute> deliveryRouteList = deliveryRouteRepository.findAll();
        assertThat(deliveryRouteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchDeliveryRoute() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRouteRepository.findAll().size();
        deliveryRoute.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryRouteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(deliveryRoute))
            )
            .andExpect(status().isBadRequest());

        // Validate the DeliveryRoute in the database
        List<DeliveryRoute> deliveryRouteList = deliveryRouteRepository.findAll();
        assertThat(deliveryRouteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamDeliveryRoute() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRouteRepository.findAll().size();
        deliveryRoute.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeliveryRouteMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(deliveryRoute))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DeliveryRoute in the database
        List<DeliveryRoute> deliveryRouteList = deliveryRouteRepository.findAll();
        assertThat(deliveryRouteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteDeliveryRoute() throws Exception {
        // Initialize the database
        deliveryRouteRepository.save(deliveryRoute);

        int databaseSizeBeforeDelete = deliveryRouteRepository.findAll().size();

        // Delete the deliveryRoute
        restDeliveryRouteMockMvc
            .perform(delete(ENTITY_API_URL_ID, deliveryRoute.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DeliveryRoute> deliveryRouteList = deliveryRouteRepository.findAll();
        assertThat(deliveryRouteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

package com.fastx.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fastx.IntegrationTest;
import com.fastx.domain.Receiver;
import com.fastx.repository.ReceiverRepository;
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
 * Integration tests for the {@link ReceiverResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ReceiverResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_STREET_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STREET_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_LOCATION = 1L;
    private static final Long UPDATED_LOCATION = 2L;

    private static final String ENTITY_API_URL = "/api/receivers";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ReceiverRepository receiverRepository;

    @Autowired
    private MockMvc restReceiverMockMvc;

    private Receiver receiver;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Receiver createEntity() {
        Receiver receiver = new Receiver()
            .name(DEFAULT_NAME)
            .country(DEFAULT_COUNTRY)
            .city(DEFAULT_CITY)
            .email(DEFAULT_EMAIL)
            .phone(DEFAULT_PHONE)
            .streetName(DEFAULT_STREET_NAME)
            .location(DEFAULT_LOCATION);
        return receiver;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Receiver createUpdatedEntity() {
        Receiver receiver = new Receiver()
            .name(UPDATED_NAME)
            .country(UPDATED_COUNTRY)
            .city(UPDATED_CITY)
            .email(UPDATED_EMAIL)
            .phone(UPDATED_PHONE)
            .streetName(UPDATED_STREET_NAME)
            .location(UPDATED_LOCATION);
        return receiver;
    }

    @BeforeEach
    public void initTest() {
        receiverRepository.deleteAll();
        receiver = createEntity();
    }

    @Test
    void createReceiver() throws Exception {
        int databaseSizeBeforeCreate = receiverRepository.findAll().size();
        // Create the Receiver
        restReceiverMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(receiver)))
            .andExpect(status().isCreated());

        // Validate the Receiver in the database
        List<Receiver> receiverList = receiverRepository.findAll();
        assertThat(receiverList).hasSize(databaseSizeBeforeCreate + 1);
        Receiver testReceiver = receiverList.get(receiverList.size() - 1);
        assertThat(testReceiver.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testReceiver.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testReceiver.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testReceiver.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testReceiver.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testReceiver.getStreetName()).isEqualTo(DEFAULT_STREET_NAME);
        assertThat(testReceiver.getLocation()).isEqualTo(DEFAULT_LOCATION);
    }

    @Test
    void createReceiverWithExistingId() throws Exception {
        // Create the Receiver with an existing ID
        receiver.setId("existing_id");

        int databaseSizeBeforeCreate = receiverRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restReceiverMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(receiver)))
            .andExpect(status().isBadRequest());

        // Validate the Receiver in the database
        List<Receiver> receiverList = receiverRepository.findAll();
        assertThat(receiverList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllReceivers() throws Exception {
        // Initialize the database
        receiverRepository.save(receiver);

        // Get all the receiverList
        restReceiverMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(receiver.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].streetName").value(hasItem(DEFAULT_STREET_NAME)))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.intValue())));
    }

    @Test
    void getReceiver() throws Exception {
        // Initialize the database
        receiverRepository.save(receiver);

        // Get the receiver
        restReceiverMockMvc
            .perform(get(ENTITY_API_URL_ID, receiver.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(receiver.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE))
            .andExpect(jsonPath("$.streetName").value(DEFAULT_STREET_NAME))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.intValue()));
    }

    @Test
    void getNonExistingReceiver() throws Exception {
        // Get the receiver
        restReceiverMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingReceiver() throws Exception {
        // Initialize the database
        receiverRepository.save(receiver);

        int databaseSizeBeforeUpdate = receiverRepository.findAll().size();

        // Update the receiver
        Receiver updatedReceiver = receiverRepository.findById(receiver.getId()).orElseThrow();
        updatedReceiver
            .name(UPDATED_NAME)
            .country(UPDATED_COUNTRY)
            .city(UPDATED_CITY)
            .email(UPDATED_EMAIL)
            .phone(UPDATED_PHONE)
            .streetName(UPDATED_STREET_NAME)
            .location(UPDATED_LOCATION);

        restReceiverMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedReceiver.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedReceiver))
            )
            .andExpect(status().isOk());

        // Validate the Receiver in the database
        List<Receiver> receiverList = receiverRepository.findAll();
        assertThat(receiverList).hasSize(databaseSizeBeforeUpdate);
        Receiver testReceiver = receiverList.get(receiverList.size() - 1);
        assertThat(testReceiver.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testReceiver.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testReceiver.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testReceiver.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testReceiver.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testReceiver.getStreetName()).isEqualTo(UPDATED_STREET_NAME);
        assertThat(testReceiver.getLocation()).isEqualTo(UPDATED_LOCATION);
    }

    @Test
    void putNonExistingReceiver() throws Exception {
        int databaseSizeBeforeUpdate = receiverRepository.findAll().size();
        receiver.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReceiverMockMvc
            .perform(
                put(ENTITY_API_URL_ID, receiver.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(receiver))
            )
            .andExpect(status().isBadRequest());

        // Validate the Receiver in the database
        List<Receiver> receiverList = receiverRepository.findAll();
        assertThat(receiverList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchReceiver() throws Exception {
        int databaseSizeBeforeUpdate = receiverRepository.findAll().size();
        receiver.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReceiverMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(receiver))
            )
            .andExpect(status().isBadRequest());

        // Validate the Receiver in the database
        List<Receiver> receiverList = receiverRepository.findAll();
        assertThat(receiverList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamReceiver() throws Exception {
        int databaseSizeBeforeUpdate = receiverRepository.findAll().size();
        receiver.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReceiverMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(receiver)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Receiver in the database
        List<Receiver> receiverList = receiverRepository.findAll();
        assertThat(receiverList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateReceiverWithPatch() throws Exception {
        // Initialize the database
        receiverRepository.save(receiver);

        int databaseSizeBeforeUpdate = receiverRepository.findAll().size();

        // Update the receiver using partial update
        Receiver partialUpdatedReceiver = new Receiver();
        partialUpdatedReceiver.setId(receiver.getId());

        partialUpdatedReceiver.country(UPDATED_COUNTRY).streetName(UPDATED_STREET_NAME);

        restReceiverMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReceiver.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReceiver))
            )
            .andExpect(status().isOk());

        // Validate the Receiver in the database
        List<Receiver> receiverList = receiverRepository.findAll();
        assertThat(receiverList).hasSize(databaseSizeBeforeUpdate);
        Receiver testReceiver = receiverList.get(receiverList.size() - 1);
        assertThat(testReceiver.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testReceiver.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testReceiver.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testReceiver.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testReceiver.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testReceiver.getStreetName()).isEqualTo(UPDATED_STREET_NAME);
        assertThat(testReceiver.getLocation()).isEqualTo(DEFAULT_LOCATION);
    }

    @Test
    void fullUpdateReceiverWithPatch() throws Exception {
        // Initialize the database
        receiverRepository.save(receiver);

        int databaseSizeBeforeUpdate = receiverRepository.findAll().size();

        // Update the receiver using partial update
        Receiver partialUpdatedReceiver = new Receiver();
        partialUpdatedReceiver.setId(receiver.getId());

        partialUpdatedReceiver
            .name(UPDATED_NAME)
            .country(UPDATED_COUNTRY)
            .city(UPDATED_CITY)
            .email(UPDATED_EMAIL)
            .phone(UPDATED_PHONE)
            .streetName(UPDATED_STREET_NAME)
            .location(UPDATED_LOCATION);

        restReceiverMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReceiver.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReceiver))
            )
            .andExpect(status().isOk());

        // Validate the Receiver in the database
        List<Receiver> receiverList = receiverRepository.findAll();
        assertThat(receiverList).hasSize(databaseSizeBeforeUpdate);
        Receiver testReceiver = receiverList.get(receiverList.size() - 1);
        assertThat(testReceiver.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testReceiver.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testReceiver.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testReceiver.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testReceiver.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testReceiver.getStreetName()).isEqualTo(UPDATED_STREET_NAME);
        assertThat(testReceiver.getLocation()).isEqualTo(UPDATED_LOCATION);
    }

    @Test
    void patchNonExistingReceiver() throws Exception {
        int databaseSizeBeforeUpdate = receiverRepository.findAll().size();
        receiver.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReceiverMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, receiver.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(receiver))
            )
            .andExpect(status().isBadRequest());

        // Validate the Receiver in the database
        List<Receiver> receiverList = receiverRepository.findAll();
        assertThat(receiverList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchReceiver() throws Exception {
        int databaseSizeBeforeUpdate = receiverRepository.findAll().size();
        receiver.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReceiverMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(receiver))
            )
            .andExpect(status().isBadRequest());

        // Validate the Receiver in the database
        List<Receiver> receiverList = receiverRepository.findAll();
        assertThat(receiverList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamReceiver() throws Exception {
        int databaseSizeBeforeUpdate = receiverRepository.findAll().size();
        receiver.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReceiverMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(receiver)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Receiver in the database
        List<Receiver> receiverList = receiverRepository.findAll();
        assertThat(receiverList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteReceiver() throws Exception {
        // Initialize the database
        receiverRepository.save(receiver);

        int databaseSizeBeforeDelete = receiverRepository.findAll().size();

        // Delete the receiver
        restReceiverMockMvc
            .perform(delete(ENTITY_API_URL_ID, receiver.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Receiver> receiverList = receiverRepository.findAll();
        assertThat(receiverList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

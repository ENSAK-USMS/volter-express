package com.fastx.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fastx.IntegrationTest;
import com.fastx.domain.Profile;
import com.fastx.domain.enumeration.ProfileType;
import com.fastx.repository.ProfileRepository;
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
 * Integration tests for the {@link ProfileResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProfileResourceIT {

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_COMPANY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_COMPANY_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_COMPANY_CITY = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_COMPANY_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_POSTAL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_COMPANY_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_STREET_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STREET_NAME = "BBBBBBBBBB";

    private static final Float DEFAULT_LOCATION_LAT = 1F;
    private static final Float UPDATED_LOCATION_LAT = 2F;

    private static final Float DEFAULT_LOCATION_LON = 1F;
    private static final Float UPDATED_LOCATION_LON = 2F;

    private static final ProfileType DEFAULT_PROFILE_TYPE = ProfileType.COMPANY;
    private static final ProfileType UPDATED_PROFILE_TYPE = ProfileType.ADMIN;

    private static final String ENTITY_API_URL = "/api/profiles";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private MockMvc restProfileMockMvc;

    private Profile profile;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Profile createEntity() {
        Profile profile = new Profile()
            .phone(DEFAULT_PHONE)
            .companyName(DEFAULT_COMPANY_NAME)
            .companyAddress(DEFAULT_COMPANY_ADDRESS)
            .companyCity(DEFAULT_COMPANY_CITY)
            .companyPostalCode(DEFAULT_COMPANY_POSTAL_CODE)
            .companyCountry(DEFAULT_COMPANY_COUNTRY)
            .country(DEFAULT_COUNTRY)
            .city(DEFAULT_CITY)
            .streetName(DEFAULT_STREET_NAME)
            .locationLat(DEFAULT_LOCATION_LAT)
            .locationLon(DEFAULT_LOCATION_LON)
            .profileType(DEFAULT_PROFILE_TYPE);
        return profile;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Profile createUpdatedEntity() {
        Profile profile = new Profile()
            .phone(UPDATED_PHONE)
            .companyName(UPDATED_COMPANY_NAME)
            .companyAddress(UPDATED_COMPANY_ADDRESS)
            .companyCity(UPDATED_COMPANY_CITY)
            .companyPostalCode(UPDATED_COMPANY_POSTAL_CODE)
            .companyCountry(UPDATED_COMPANY_COUNTRY)
            .country(UPDATED_COUNTRY)
            .city(UPDATED_CITY)
            .streetName(UPDATED_STREET_NAME)
            .locationLat(UPDATED_LOCATION_LAT)
            .locationLon(UPDATED_LOCATION_LON)
            .profileType(UPDATED_PROFILE_TYPE);
        return profile;
    }

    @BeforeEach
    public void initTest() {
        profileRepository.deleteAll();
        profile = createEntity();
    }

    @Test
    void createProfile() throws Exception {
        int databaseSizeBeforeCreate = profileRepository.findAll().size();
        // Create the Profile
        restProfileMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(profile)))
            .andExpect(status().isCreated());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeCreate + 1);
        Profile testProfile = profileList.get(profileList.size() - 1);
        assertThat(testProfile.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testProfile.getCompanyName()).isEqualTo(DEFAULT_COMPANY_NAME);
        assertThat(testProfile.getCompanyAddress()).isEqualTo(DEFAULT_COMPANY_ADDRESS);
        assertThat(testProfile.getCompanyCity()).isEqualTo(DEFAULT_COMPANY_CITY);
        assertThat(testProfile.getCompanyPostalCode()).isEqualTo(DEFAULT_COMPANY_POSTAL_CODE);
        assertThat(testProfile.getCompanyCountry()).isEqualTo(DEFAULT_COMPANY_COUNTRY);
        assertThat(testProfile.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testProfile.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testProfile.getStreetName()).isEqualTo(DEFAULT_STREET_NAME);
        assertThat(testProfile.getLocationLat()).isEqualTo(DEFAULT_LOCATION_LAT);
        assertThat(testProfile.getLocationLon()).isEqualTo(DEFAULT_LOCATION_LON);
        assertThat(testProfile.getProfileType()).isEqualTo(DEFAULT_PROFILE_TYPE);
    }

    @Test
    void createProfileWithExistingId() throws Exception {
        // Create the Profile with an existing ID
        profile.setId("existing_id");

        int databaseSizeBeforeCreate = profileRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfileMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(profile)))
            .andExpect(status().isBadRequest());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllProfiles() throws Exception {
        // Initialize the database
        profileRepository.save(profile);

        // Get all the profileList
        restProfileMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profile.getId())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].companyName").value(hasItem(DEFAULT_COMPANY_NAME)))
            .andExpect(jsonPath("$.[*].companyAddress").value(hasItem(DEFAULT_COMPANY_ADDRESS)))
            .andExpect(jsonPath("$.[*].companyCity").value(hasItem(DEFAULT_COMPANY_CITY)))
            .andExpect(jsonPath("$.[*].companyPostalCode").value(hasItem(DEFAULT_COMPANY_POSTAL_CODE)))
            .andExpect(jsonPath("$.[*].companyCountry").value(hasItem(DEFAULT_COMPANY_COUNTRY)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].streetName").value(hasItem(DEFAULT_STREET_NAME)))
            .andExpect(jsonPath("$.[*].locationLat").value(hasItem(DEFAULT_LOCATION_LAT.doubleValue())))
            .andExpect(jsonPath("$.[*].locationLon").value(hasItem(DEFAULT_LOCATION_LON.doubleValue())))
            .andExpect(jsonPath("$.[*].profileType").value(hasItem(DEFAULT_PROFILE_TYPE.toString())));
    }

    @Test
    void getProfile() throws Exception {
        // Initialize the database
        profileRepository.save(profile);

        // Get the profile
        restProfileMockMvc
            .perform(get(ENTITY_API_URL_ID, profile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(profile.getId()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE))
            .andExpect(jsonPath("$.companyName").value(DEFAULT_COMPANY_NAME))
            .andExpect(jsonPath("$.companyAddress").value(DEFAULT_COMPANY_ADDRESS))
            .andExpect(jsonPath("$.companyCity").value(DEFAULT_COMPANY_CITY))
            .andExpect(jsonPath("$.companyPostalCode").value(DEFAULT_COMPANY_POSTAL_CODE))
            .andExpect(jsonPath("$.companyCountry").value(DEFAULT_COMPANY_COUNTRY))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.streetName").value(DEFAULT_STREET_NAME))
            .andExpect(jsonPath("$.locationLat").value(DEFAULT_LOCATION_LAT.doubleValue()))
            .andExpect(jsonPath("$.locationLon").value(DEFAULT_LOCATION_LON.doubleValue()))
            .andExpect(jsonPath("$.profileType").value(DEFAULT_PROFILE_TYPE.toString()));
    }

    @Test
    void getNonExistingProfile() throws Exception {
        // Get the profile
        restProfileMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingProfile() throws Exception {
        // Initialize the database
        profileRepository.save(profile);

        int databaseSizeBeforeUpdate = profileRepository.findAll().size();

        // Update the profile
        Profile updatedProfile = profileRepository.findById(profile.getId()).orElseThrow();
        updatedProfile
            .phone(UPDATED_PHONE)
            .companyName(UPDATED_COMPANY_NAME)
            .companyAddress(UPDATED_COMPANY_ADDRESS)
            .companyCity(UPDATED_COMPANY_CITY)
            .companyPostalCode(UPDATED_COMPANY_POSTAL_CODE)
            .companyCountry(UPDATED_COMPANY_COUNTRY)
            .country(UPDATED_COUNTRY)
            .city(UPDATED_CITY)
            .streetName(UPDATED_STREET_NAME)
            .locationLat(UPDATED_LOCATION_LAT)
            .locationLon(UPDATED_LOCATION_LON)
            .profileType(UPDATED_PROFILE_TYPE);

        restProfileMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedProfile.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedProfile))
            )
            .andExpect(status().isOk());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeUpdate);
        Profile testProfile = profileList.get(profileList.size() - 1);
        assertThat(testProfile.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testProfile.getCompanyName()).isEqualTo(UPDATED_COMPANY_NAME);
        assertThat(testProfile.getCompanyAddress()).isEqualTo(UPDATED_COMPANY_ADDRESS);
        assertThat(testProfile.getCompanyCity()).isEqualTo(UPDATED_COMPANY_CITY);
        assertThat(testProfile.getCompanyPostalCode()).isEqualTo(UPDATED_COMPANY_POSTAL_CODE);
        assertThat(testProfile.getCompanyCountry()).isEqualTo(UPDATED_COMPANY_COUNTRY);
        assertThat(testProfile.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testProfile.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testProfile.getStreetName()).isEqualTo(UPDATED_STREET_NAME);
        assertThat(testProfile.getLocationLat()).isEqualTo(UPDATED_LOCATION_LAT);
        assertThat(testProfile.getLocationLon()).isEqualTo(UPDATED_LOCATION_LON);
        assertThat(testProfile.getProfileType()).isEqualTo(UPDATED_PROFILE_TYPE);
    }

    @Test
    void putNonExistingProfile() throws Exception {
        int databaseSizeBeforeUpdate = profileRepository.findAll().size();
        profile.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfileMockMvc
            .perform(
                put(ENTITY_API_URL_ID, profile.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(profile))
            )
            .andExpect(status().isBadRequest());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchProfile() throws Exception {
        int databaseSizeBeforeUpdate = profileRepository.findAll().size();
        profile.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProfileMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(profile))
            )
            .andExpect(status().isBadRequest());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamProfile() throws Exception {
        int databaseSizeBeforeUpdate = profileRepository.findAll().size();
        profile.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProfileMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(profile)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateProfileWithPatch() throws Exception {
        // Initialize the database
        profileRepository.save(profile);

        int databaseSizeBeforeUpdate = profileRepository.findAll().size();

        // Update the profile using partial update
        Profile partialUpdatedProfile = new Profile();
        partialUpdatedProfile.setId(profile.getId());

        partialUpdatedProfile
            .companyAddress(UPDATED_COMPANY_ADDRESS)
            .companyPostalCode(UPDATED_COMPANY_POSTAL_CODE)
            .city(UPDATED_CITY)
            .streetName(UPDATED_STREET_NAME)
            .locationLon(UPDATED_LOCATION_LON);

        restProfileMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProfile.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProfile))
            )
            .andExpect(status().isOk());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeUpdate);
        Profile testProfile = profileList.get(profileList.size() - 1);
        assertThat(testProfile.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testProfile.getCompanyName()).isEqualTo(DEFAULT_COMPANY_NAME);
        assertThat(testProfile.getCompanyAddress()).isEqualTo(UPDATED_COMPANY_ADDRESS);
        assertThat(testProfile.getCompanyCity()).isEqualTo(DEFAULT_COMPANY_CITY);
        assertThat(testProfile.getCompanyPostalCode()).isEqualTo(UPDATED_COMPANY_POSTAL_CODE);
        assertThat(testProfile.getCompanyCountry()).isEqualTo(DEFAULT_COMPANY_COUNTRY);
        assertThat(testProfile.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testProfile.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testProfile.getStreetName()).isEqualTo(UPDATED_STREET_NAME);
        assertThat(testProfile.getLocationLat()).isEqualTo(DEFAULT_LOCATION_LAT);
        assertThat(testProfile.getLocationLon()).isEqualTo(UPDATED_LOCATION_LON);
        assertThat(testProfile.getProfileType()).isEqualTo(DEFAULT_PROFILE_TYPE);
    }

    @Test
    void fullUpdateProfileWithPatch() throws Exception {
        // Initialize the database
        profileRepository.save(profile);

        int databaseSizeBeforeUpdate = profileRepository.findAll().size();

        // Update the profile using partial update
        Profile partialUpdatedProfile = new Profile();
        partialUpdatedProfile.setId(profile.getId());

        partialUpdatedProfile
            .phone(UPDATED_PHONE)
            .companyName(UPDATED_COMPANY_NAME)
            .companyAddress(UPDATED_COMPANY_ADDRESS)
            .companyCity(UPDATED_COMPANY_CITY)
            .companyPostalCode(UPDATED_COMPANY_POSTAL_CODE)
            .companyCountry(UPDATED_COMPANY_COUNTRY)
            .country(UPDATED_COUNTRY)
            .city(UPDATED_CITY)
            .streetName(UPDATED_STREET_NAME)
            .locationLat(UPDATED_LOCATION_LAT)
            .locationLon(UPDATED_LOCATION_LON)
            .profileType(UPDATED_PROFILE_TYPE);

        restProfileMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProfile.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProfile))
            )
            .andExpect(status().isOk());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeUpdate);
        Profile testProfile = profileList.get(profileList.size() - 1);
        assertThat(testProfile.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testProfile.getCompanyName()).isEqualTo(UPDATED_COMPANY_NAME);
        assertThat(testProfile.getCompanyAddress()).isEqualTo(UPDATED_COMPANY_ADDRESS);
        assertThat(testProfile.getCompanyCity()).isEqualTo(UPDATED_COMPANY_CITY);
        assertThat(testProfile.getCompanyPostalCode()).isEqualTo(UPDATED_COMPANY_POSTAL_CODE);
        assertThat(testProfile.getCompanyCountry()).isEqualTo(UPDATED_COMPANY_COUNTRY);
        assertThat(testProfile.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testProfile.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testProfile.getStreetName()).isEqualTo(UPDATED_STREET_NAME);
        assertThat(testProfile.getLocationLat()).isEqualTo(UPDATED_LOCATION_LAT);
        assertThat(testProfile.getLocationLon()).isEqualTo(UPDATED_LOCATION_LON);
        assertThat(testProfile.getProfileType()).isEqualTo(UPDATED_PROFILE_TYPE);
    }

    @Test
    void patchNonExistingProfile() throws Exception {
        int databaseSizeBeforeUpdate = profileRepository.findAll().size();
        profile.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfileMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, profile.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(profile))
            )
            .andExpect(status().isBadRequest());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchProfile() throws Exception {
        int databaseSizeBeforeUpdate = profileRepository.findAll().size();
        profile.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProfileMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(profile))
            )
            .andExpect(status().isBadRequest());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamProfile() throws Exception {
        int databaseSizeBeforeUpdate = profileRepository.findAll().size();
        profile.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProfileMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(profile)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Profile in the database
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteProfile() throws Exception {
        // Initialize the database
        profileRepository.save(profile);

        int databaseSizeBeforeDelete = profileRepository.findAll().size();

        // Delete the profile
        restProfileMockMvc
            .perform(delete(ENTITY_API_URL_ID, profile.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Profile> profileList = profileRepository.findAll();
        assertThat(profileList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

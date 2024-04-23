package com.fastx.service.impl;

import com.fastx.domain.Profile;
import com.fastx.repository.ProfileRepository;
import com.fastx.service.ProfileService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link com.fastx.domain.Profile}.
 */
@Service
public class ProfileServiceImpl implements ProfileService {

    private final Logger log = LoggerFactory.getLogger(ProfileServiceImpl.class);

    private final ProfileRepository profileRepository;

    public ProfileServiceImpl(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Override
    public Profile save(Profile profile) {
        log.debug("Request to save Profile : {}", profile);
        return profileRepository.save(profile);
    }

    @Override
    public Profile update(Profile profile) {
        log.debug("Request to update Profile : {}", profile);
        return profileRepository.save(profile);
    }

    @Override
    public Optional<Profile> partialUpdate(Profile profile) {
        log.debug("Request to partially update Profile : {}", profile);

        return profileRepository
            .findById(profile.getId())
            .map(existingProfile -> {
                if (profile.getPhone() != null) {
                    existingProfile.setPhone(profile.getPhone());
                }
                if (profile.getCity() != null) {
                    existingProfile.setCity(profile.getCity());
                }
                if (profile.getStreetName() != null) {
                    existingProfile.setStreetName(profile.getStreetName());
                }
                if (profile.getLocationLat() != null) {
                    existingProfile.setLocationLat(profile.getLocationLat());
                }
                if (profile.getLocationLon() != null) {
                    existingProfile.setLocationLon(profile.getLocationLon());
                }
                if (profile.getProfileType() != null) {
                    existingProfile.setProfileType(profile.getProfileType());
                }

                return existingProfile;
            })
            .map(profileRepository::save);
    }

    @Override
    public List<Profile> findAll() {
        log.debug("Request to get all Profiles");
        return profileRepository.findAll();
    }

    @Override
    public Optional<Profile> findOne(String id) {
        log.debug("Request to get Profile : {}", id);
        return profileRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Profile : {}", id);
        profileRepository.deleteById(id);
    }
}

package com.fastx.domain;

import com.fastx.domain.enumeration.ProfileType;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Profile.
 */
@Document(collection = "profile")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Profile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("phone")
    private String phone;

    @Field("country")
    private String country;

    @Field("city")
    private String city;

    @Field("street_name")
    private String streetName;

    @Field("location_lat")
    private Float locationLat;

    @Field("location_lon")
    private Float locationLon;

    @Field("profile_type")
    private ProfileType profileType;

    // userid
    @Field("user_id")
    private String userId;



    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Profile id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPhone() {
        return this.phone;
    }

    public Profile phone(String phone) {
        this.setPhone(phone);
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }










    public Profile country(String country) {
        this.setCountry(country);
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return this.city;
    }

    public Profile city(String city) {
        this.setCity(city);
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreetName() {
        return this.streetName;
    }

    public Profile streetName(String streetName) {
        this.setStreetName(streetName);
        return this;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public Float getLocationLat() {
        return this.locationLat;
    }

    public Profile locationLat(Float locationLat) {
        this.setLocationLat(locationLat);
        return this;
    }

    public void setLocationLat(Float locationLat) {
        this.locationLat = locationLat;
    }

    public Float getLocationLon() {
        return this.locationLon;
    }

    public Profile locationLon(Float locationLon) {
        this.setLocationLon(locationLon);
        return this;
    }

    public void setLocationLon(Float locationLon) {
        this.locationLon = locationLon;
    }

    public ProfileType getProfileType() {
        return this.profileType;
    }

    public Profile profileType(ProfileType profileType) {
        this.setProfileType(profileType);
        return this;
    }

    public void setProfileType(ProfileType profileType) {
        this.profileType = profileType;
    }

    public String getUserId() {
        return this.userId;
    }

    public Profile userId(String userId) {
        this.setUserId(userId);
        return this;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Profile)) {
            return false;
        }
        return getId() != null && getId().equals(((Profile) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Profile{" +
            "id=" + getId() +
            ", phone='" + getPhone() + "'" +
            ", city='" + getCity() + "'" +
            ", streetName='" + getStreetName() + "'" +
            ", locationLat=" + getLocationLat() +
            ", locationLon=" + getLocationLon() +
            ", profileType='" + getProfileType() + "'" +
            "}";
    }
}

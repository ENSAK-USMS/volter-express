package com.fastx.domain;

import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.Map;

/**
 * A Receiver.
 */
@Document(collection = "receiver")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Receiver implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("country")
    private String country;

    @Field("city")
    private String city;

    @Field("email")
    private String email;

    @Field("phone")
    private String phone;

    @Field("street_name")
    private String streetName;

    @Field("location")
    private Map<String, Object> location;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Receiver id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Receiver name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return this.country;
    }

    public Receiver country(String country) {
        this.setCountry(country);
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return this.city;
    }

    public Receiver city(String city) {
        this.setCity(city);
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getEmail() {
        return this.email;
    }

    public Receiver email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return this.phone;
    }

    public Receiver phone(String phone) {
        this.setPhone(phone);
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getStreetName() {
        return this.streetName;
    }

    public Receiver streetName(String streetName) {
        this.setStreetName(streetName);
        return this;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public Map<String, Object> getLocation() {
        return this.location;
    }

    public Receiver location(Map<String, Object> location) {
        this.setLocation(location);
        return this;
    }

    public void setLocation(Map<String, Object> location) {
        this.location = location;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Receiver)) {
            return false;
        }
        return getId() != null && getId().equals(((Receiver) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Receiver{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", country='" + getCountry() + "'" +
            ", city='" + getCity() + "'" +
            ", email='" + getEmail() + "'" +
            ", phone='" + getPhone() + "'" +
            ", streetName='" + getStreetName() + "'" +
            ", location=" + getLocation() +
            "}";
    }
}

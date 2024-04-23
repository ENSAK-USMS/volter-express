package com.fastx.domain;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A DeliveryTruck.
 */
@Document(collection = "delivery_truck")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DeliveryTruck implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;


    @Field("capacity_kg")
    private Float capacityKg;

    @Field("current_location")
    private  List<Float> currentLocation;

    @Field("status")
    private String status;

    @Field("driver_name")
    private String driverName;

    @Field("driver_contact")
    private String driverContact;

    @Field("license_plate")
    private String licensePlate;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public DeliveryTruck id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }




    public Float getCapacityKg() {
        return this.capacityKg;
    }

    public DeliveryTruck capacityKg(Float capacityKg) {
        this.setCapacityKg(capacityKg);
        return this;
    }

    public void setCapacityKg(Float capacityKg) {
        this.capacityKg = capacityKg;
    }

    public List<Float> getCurrentLocation() {
        return this.currentLocation;
    }

    public DeliveryTruck currentLocation(List<Float> currentLocation) {
        this.setCurrentLocation(currentLocation);
        return this;
    }

    public void setCurrentLocation(List<Float> currentLocation) {
        this.currentLocation = currentLocation;
    }

    public String getStatus() {
        return this.status;
    }

    public DeliveryTruck status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDriverName() {
        return this.driverName;
    }

    public DeliveryTruck driverName(String driverName) {
        this.setDriverName(driverName);
        return this;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public String getDriverContact() {
        return this.driverContact;
    }

    public DeliveryTruck driverContact(String driverContact) {
        this.setDriverContact(driverContact);
        return this;
    }

    public void setDriverContact(String driverContact) {
        this.driverContact = driverContact;
    }

    public String getLicensePlate() {
        return this.licensePlate;
    }

    public DeliveryTruck licensePlate(String licensePlate) {
        this.setLicensePlate(licensePlate);
        return this;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DeliveryTruck)) {
            return false;
        }
        return getId() != null && getId().equals(((DeliveryTruck) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DeliveryTruck{" +
            "id=" + getId() +
            ", capacityKg=" + getCapacityKg() +
            ", currentLocation=" + getCurrentLocation() +
            ", status='" + getStatus() + "'" +
            ", driverName='" + getDriverName() + "'" +
            ", driverContact='" + getDriverContact() + "'" +
            ", licensePlate='" + getLicensePlate() + "'" +
            "}";
    }
}

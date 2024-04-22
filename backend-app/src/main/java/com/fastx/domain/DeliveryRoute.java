package com.fastx.domain;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A DeliveryRoute.
 */
@Document(collection = "delivery_route")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DeliveryRoute implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("delivery_route_id")
    private Long deliveryRouteId;

    @Field("estimated_travel_time")
    private Integer estimatedTravelTime;

    @Field("special_instructions")
    private String specialInstructions;

    // waypoints
    @Field("waypoints")
    private List<String> waypoints;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public List<String> getWaypoints() {
        return waypoints;
    }

    public void setWaypoints(List<String> waypoints) {
        this.waypoints = waypoints;
    }

    public DeliveryRoute waypoints(List<String> waypoints) {
        this.waypoints = waypoints;
        return this;
    }

    public String getId() {
        return this.id;
    }

    public DeliveryRoute id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getDeliveryRouteId() {
        return this.deliveryRouteId;
    }

    public DeliveryRoute deliveryRouteId(Long deliveryRouteId) {
        this.setDeliveryRouteId(deliveryRouteId);
        return this;
    }

    public void setDeliveryRouteId(Long deliveryRouteId) {
        this.deliveryRouteId = deliveryRouteId;
    }

    public Integer getEstimatedTravelTime() {
        return this.estimatedTravelTime;
    }

    public DeliveryRoute estimatedTravelTime(Integer estimatedTravelTime) {
        this.setEstimatedTravelTime(estimatedTravelTime);
        return this;
    }

    public void setEstimatedTravelTime(Integer estimatedTravelTime) {
        this.estimatedTravelTime = estimatedTravelTime;
    }

    public String getSpecialInstructions() {
        return this.specialInstructions;
    }

    public DeliveryRoute specialInstructions(String specialInstructions) {
        this.setSpecialInstructions(specialInstructions);
        return this;
    }

    public void setSpecialInstructions(String specialInstructions) {
        this.specialInstructions = specialInstructions;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DeliveryRoute)) {
            return false;
        }
        return getId() != null && getId().equals(((DeliveryRoute) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DeliveryRoute{" +
            "id=" + getId() +
            ", deliveryRouteId=" + getDeliveryRouteId() +
            ", estimatedTravelTime=" + getEstimatedTravelTime() +
            ", specialInstructions='" + getSpecialInstructions() + "'" +
            "}";
    }
}

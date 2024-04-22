package com.fastx.domain;

import java.io.Serializable;
import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Delivery.
 */
@Document(collection = "delivery")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Delivery implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("delivery_date")
    private Instant deliveryDate;

    @Field("order_id")
    private Long orderId;

    @Field("delivery_address_id")
    private Long deliveryAddressId;

    @Field("delivery_route_id")
    private Long deliveryRouteId;

    @Field("estimated_travel_time")
    private Integer estimatedTravelTime;

    @Field("delivery_truck_id")
    private Long deliveryTruckId;

    @Field("receiver_id")
    private Long receiverId;

    @Field("order_trucking_number")
    private Long orderTruckingNumber;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Delivery id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getDeliveryDate() {
        return this.deliveryDate;
    }

    public Delivery deliveryDate(Instant deliveryDate) {
        this.setDeliveryDate(deliveryDate);
        return this;
    }

    public void setDeliveryDate(Instant deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public Long getOrderId() {
        return this.orderId;
    }

    public Delivery orderId(Long orderId) {
        this.setOrderId(orderId);
        return this;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getDeliveryAddressId() {
        return this.deliveryAddressId;
    }

    public Delivery deliveryAddressId(Long deliveryAddressId) {
        this.setDeliveryAddressId(deliveryAddressId);
        return this;
    }

    public void setDeliveryAddressId(Long deliveryAddressId) {
        this.deliveryAddressId = deliveryAddressId;
    }

    public Long getDeliveryRouteId() {
        return this.deliveryRouteId;
    }

    public Delivery deliveryRouteId(Long deliveryRouteId) {
        this.setDeliveryRouteId(deliveryRouteId);
        return this;
    }

    public void setDeliveryRouteId(Long deliveryRouteId) {
        this.deliveryRouteId = deliveryRouteId;
    }

    public Integer getEstimatedTravelTime() {
        return this.estimatedTravelTime;
    }

    public Delivery estimatedTravelTime(Integer estimatedTravelTime) {
        this.setEstimatedTravelTime(estimatedTravelTime);
        return this;
    }

    public void setEstimatedTravelTime(Integer estimatedTravelTime) {
        this.estimatedTravelTime = estimatedTravelTime;
    }

    public Long getDeliveryTruckId() {
        return this.deliveryTruckId;
    }

    public Delivery deliveryTruckId(Long deliveryTruckId) {
        this.setDeliveryTruckId(deliveryTruckId);
        return this;
    }

    public void setDeliveryTruckId(Long deliveryTruckId) {
        this.deliveryTruckId = deliveryTruckId;
    }

    public Long getReceiverId() {
        return this.receiverId;
    }

    public Delivery receiverId(Long receiverId) {
        this.setReceiverId(receiverId);
        return this;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }

    public Long getOrderTruckingNumber() {
        return this.orderTruckingNumber;
    }

    public Delivery orderTruckingNumber(Long orderTruckingNumber) {
        this.setOrderTruckingNumber(orderTruckingNumber);
        return this;
    }

    public void setOrderTruckingNumber(Long orderTruckingNumber) {
        this.orderTruckingNumber = orderTruckingNumber;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Delivery)) {
            return false;
        }
        return getId() != null && getId().equals(((Delivery) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Delivery{" +
            "id=" + getId() +
            ", deliveryDate='" + getDeliveryDate() + "'" +
            ", orderId=" + getOrderId() +
            ", deliveryAddressId=" + getDeliveryAddressId() +
            ", deliveryRouteId=" + getDeliveryRouteId() +
            ", estimatedTravelTime=" + getEstimatedTravelTime() +
            ", deliveryTruckId=" + getDeliveryTruckId() +
            ", receiverId=" + getReceiverId() +
            ", orderTruckingNumber=" + getOrderTruckingNumber() +
            "}";
    }
}

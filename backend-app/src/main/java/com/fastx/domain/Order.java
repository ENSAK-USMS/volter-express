package com.fastx.domain;

import java.io.Serializable;
import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Order.
 */
@Document(collection = "order")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("order_id")
    private Long orderId;

    @Field("order_date")
    private Instant orderDate;

    @Field("total_amount")
    private Float totalAmount;

    @Field("weight_kg")
    private Float weightKg;

    @Field("status")
    private String status;

    @Field("expiration_date")
    private Instant expirationDate;

    @Field("delivery_id")
    private Long deliveryId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Order id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getOrderId() {
        return this.orderId;
    }

    public Order orderId(Long orderId) {
        this.setOrderId(orderId);
        return this;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Instant getOrderDate() {
        return this.orderDate;
    }

    public Order orderDate(Instant orderDate) {
        this.setOrderDate(orderDate);
        return this;
    }

    public void setOrderDate(Instant orderDate) {
        this.orderDate = orderDate;
    }

    public Float getTotalAmount() {
        return this.totalAmount;
    }

    public Order totalAmount(Float totalAmount) {
        this.setTotalAmount(totalAmount);
        return this;
    }

    public void setTotalAmount(Float totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Float getWeightKg() {
        return this.weightKg;
    }

    public Order weightKg(Float weightKg) {
        this.setWeightKg(weightKg);
        return this;
    }

    public void setWeightKg(Float weightKg) {
        this.weightKg = weightKg;
    }

    public String getStatus() {
        return this.status;
    }

    public Order status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getExpirationDate() {
        return this.expirationDate;
    }

    public Order expirationDate(Instant expirationDate) {
        this.setExpirationDate(expirationDate);
        return this;
    }

    public void setExpirationDate(Instant expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Long getDeliveryId() {
        return this.deliveryId;
    }

    public Order deliveryId(Long deliveryId) {
        this.setDeliveryId(deliveryId);
        return this;
    }

    public void setDeliveryId(Long deliveryId) {
        this.deliveryId = deliveryId;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        return getId() != null && getId().equals(((Order) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", orderId=" + getOrderId() +
            ", orderDate='" + getOrderDate() + "'" +
            ", totalAmount=" + getTotalAmount() +
            ", weightKg=" + getWeightKg() +
            ", status='" + getStatus() + "'" +
            ", expirationDate='" + getExpirationDate() + "'" +
            ", deliveryId=" + getDeliveryId() +
            "}";
    }
}

package com.fastx.service;

import com.fastx.domain.DeliveryTruck;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.fastx.domain.DeliveryTruck}.
 */
public interface DeliveryTruckService {
    /**
     * Save a deliveryTruck.
     *
     * @param deliveryTruck the entity to save.
     * @return the persisted entity.
     */
    DeliveryTruck save(DeliveryTruck deliveryTruck);

    /**
     * Updates a deliveryTruck.
     *
     * @param deliveryTruck the entity to update.
     * @return the persisted entity.
     */
    DeliveryTruck update(DeliveryTruck deliveryTruck);

    /**
     * Partially updates a deliveryTruck.
     *
     * @param deliveryTruck the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DeliveryTruck> partialUpdate(DeliveryTruck deliveryTruck);

    /**
     * Get all the deliveryTrucks.
     *
     * @return the list of entities.
     */
    List<DeliveryTruck> findAll();

    /**
     * Get the "id" deliveryTruck.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DeliveryTruck> findOne(String id);

    /**
     * Delete the "id" deliveryTruck.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

package com.fastx.service;

import com.fastx.domain.Delivery;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.fastx.domain.Delivery}.
 */
public interface DeliveryService {
    /**
     * Save a delivery.
     *
     * @param delivery the entity to save.
     * @return the persisted entity.
     */
    Delivery save(Delivery delivery);

    /**
     * Updates a delivery.
     *
     * @param delivery the entity to update.
     * @return the persisted entity.
     */
    Delivery update(Delivery delivery);

    /**
     * Partially updates a delivery.
     *
     * @param delivery the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Delivery> partialUpdate(Delivery delivery);

    /**
     * Get all the deliveries.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Delivery> findAll(Pageable pageable);

    /**
     * Get the "id" delivery.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Delivery> findOne(String id);

    /**
     * Delete the "id" delivery.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

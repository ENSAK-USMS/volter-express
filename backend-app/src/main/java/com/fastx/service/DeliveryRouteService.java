package com.fastx.service;

import com.fastx.domain.DeliveryRoute;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.fastx.domain.DeliveryRoute}.
 */
public interface DeliveryRouteService {
    /**
     * Save a deliveryRoute.
     *
     * @param deliveryRoute the entity to save.
     * @return the persisted entity.
     */
    DeliveryRoute save(DeliveryRoute deliveryRoute);

    /**
     * Updates a deliveryRoute.
     *
     * @param deliveryRoute the entity to update.
     * @return the persisted entity.
     */
    DeliveryRoute update(DeliveryRoute deliveryRoute);

    /**
     * Partially updates a deliveryRoute.
     *
     * @param deliveryRoute the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DeliveryRoute> partialUpdate(DeliveryRoute deliveryRoute);

    /**
     * Get all the deliveryRoutes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DeliveryRoute> findAll(Pageable pageable);

    /**
     * Get the "id" deliveryRoute.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DeliveryRoute> findOne(String id);

    /**
     * Delete the "id" deliveryRoute.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

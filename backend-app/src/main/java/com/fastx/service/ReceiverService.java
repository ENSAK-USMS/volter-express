package com.fastx.service;

import com.fastx.domain.Receiver;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.fastx.domain.Receiver}.
 */
public interface ReceiverService {
    /**
     * Save a receiver.
     *
     * @param receiver the entity to save.
     * @return the persisted entity.
     */
    Receiver save(Receiver receiver);

    /**
     * Updates a receiver.
     *
     * @param receiver the entity to update.
     * @return the persisted entity.
     */
    Receiver update(Receiver receiver);

    /**
     * Partially updates a receiver.
     *
     * @param receiver the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Receiver> partialUpdate(Receiver receiver);

    /**
     * Get all the receivers.
     *
     * @return the list of entities.
     */
    List<Receiver> findAll();

    /**
     * Get the "id" receiver.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Receiver> findOne(String id);

    /**
     * Delete the "id" receiver.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

package com.fastx.web.rest;

import com.fastx.domain.DeliveryTruck;
import com.fastx.repository.DeliveryTruckRepository;
import com.fastx.service.DeliveryTruckService;
import com.fastx.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import reactor.core.publisher.Flux;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.Duration;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

/**
 * REST controller for managing {@link com.fastx.domain.DeliveryTruck}.
 */
@RestController
@RequestMapping("/api/delivery-trucks")
public class DeliveryTruckResource {

    private final Logger log = LoggerFactory.getLogger(DeliveryTruckResource.class);

    private static final String ENTITY_NAME = "deliveryTruck";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DeliveryTruckService deliveryTruckService;

    private final DeliveryTruckRepository deliveryTruckRepository;

    public DeliveryTruckResource(DeliveryTruckService deliveryTruckService, DeliveryTruckRepository deliveryTruckRepository) {
        this.deliveryTruckService = deliveryTruckService;
        this.deliveryTruckRepository = deliveryTruckRepository;
    }

    /**
     * {@code POST  /delivery-trucks} : Create a new deliveryTruck.
     *
     * @param deliveryTruck the deliveryTruck to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new deliveryTruck, or with status {@code 400 (Bad Request)} if the deliveryTruck has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<DeliveryTruck> createDeliveryTruck(@Valid @RequestBody DeliveryTruck deliveryTruck) throws URISyntaxException {
        log.debug("REST request to save DeliveryTruck : {}", deliveryTruck);
        if (deliveryTruck.getId() != null) {
            throw new BadRequestAlertException("A new deliveryTruck cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DeliveryTruck result = deliveryTruckService.save(deliveryTruck);
        return ResponseEntity
            .created(new URI("/api/delivery-trucks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /delivery-trucks/:id} : Updates an existing deliveryTruck.
     *
     * @param id the id of the deliveryTruck to save.
     * @param deliveryTruck the deliveryTruck to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated deliveryTruck,
     * or with status {@code 400 (Bad Request)} if the deliveryTruck is not valid,
     * or with status {@code 500 (Internal Server Error)} if the deliveryTruck couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<DeliveryTruck> updateDeliveryTruck(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody DeliveryTruck deliveryTruck
    ) throws URISyntaxException {
        log.debug("REST request to update DeliveryTruck : {}, {}", id, deliveryTruck);
        if (deliveryTruck.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, deliveryTruck.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!deliveryTruckRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DeliveryTruck result = deliveryTruckService.update(deliveryTruck);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, deliveryTruck.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /delivery-trucks/:id} : Partial updates given fields of an existing deliveryTruck, field will ignore if it is null
     *
     * @param id the id of the deliveryTruck to save.
     * @param deliveryTruck the deliveryTruck to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated deliveryTruck,
     * or with status {@code 400 (Bad Request)} if the deliveryTruck is not valid,
     * or with status {@code 404 (Not Found)} if the deliveryTruck is not found,
     * or with status {@code 500 (Internal Server Error)} if the deliveryTruck couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DeliveryTruck> partialUpdateDeliveryTruck(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody DeliveryTruck deliveryTruck
    ) throws URISyntaxException {
        log.debug("REST request to partial update DeliveryTruck partially : {}, {}", id, deliveryTruck);
        if (deliveryTruck.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, deliveryTruck.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!deliveryTruckRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DeliveryTruck> result = deliveryTruckService.partialUpdate(deliveryTruck);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, deliveryTruck.getId())
        );
    }

    /**
     * {@code GET  /delivery-trucks} : get all the deliveryTrucks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of deliveryTrucks in body.
     */
    @GetMapping("")
    public List<DeliveryTruck> getAllDeliveryTrucks() {
        log.debug("REST request to get all DeliveryTrucks");
        return deliveryTruckService.findAll();
    }

    /**
     * {@code GET  /delivery-trucks/:id} : get the "id" deliveryTruck.
     *
     * @param id the id of the deliveryTruck to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the deliveryTruck, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<DeliveryTruck> getDeliveryTruck(@PathVariable("id") String id) {
        log.debug("REST request to get DeliveryTruck : {}", id);
        Optional<DeliveryTruck> deliveryTruck = deliveryTruckService.findOne(id);
        return ResponseUtil.wrapOrNotFound(deliveryTruck);
    }

    /**
     * {@code DELETE  /delivery-trucks/:id} : delete the "id" deliveryTruck.
     *
     * @param id the id of the deliveryTruck to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeliveryTruck(@PathVariable("id") String id) {
        log.debug("REST request to delete DeliveryTruck : {}", id);
        deliveryTruckService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }


    // add server sent event to get delivery truck location when it is updated
    @GetMapping(path="/delivery-trucks/{id}/location", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<List<Float>> streamFlux() {
        return Flux.interval(Duration.ofSeconds(2))
            .map(tick -> {
                // Get the current location of the truck
                List<Float> location = deliveryTruckService.getCurrentLocation();
                return location;
            });
    }
}

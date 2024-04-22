package com.fastx.web.rest;

import com.fastx.domain.Delivery;
import com.fastx.repository.DeliveryRepository;
import com.fastx.service.DeliveryService;
import com.fastx.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.fastx.domain.Delivery}.
 */
@RestController
@RequestMapping("/api/deliveries")
public class DeliveryResource {

    private final Logger log = LoggerFactory.getLogger(DeliveryResource.class);

    private static final String ENTITY_NAME = "delivery";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DeliveryService deliveryService;

    private final DeliveryRepository deliveryRepository;

    public DeliveryResource(DeliveryService deliveryService, DeliveryRepository deliveryRepository) {
        this.deliveryService = deliveryService;
        this.deliveryRepository = deliveryRepository;
    }

    /**
     * {@code POST  /deliveries} : Create a new delivery.
     *
     * @param delivery the delivery to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new delivery, or with status {@code 400 (Bad Request)} if the delivery has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Delivery> createDelivery(@RequestBody Delivery delivery) throws URISyntaxException {
        log.debug("REST request to save Delivery : {}", delivery);
        if (delivery.getId() != null) {
            throw new BadRequestAlertException("A new delivery cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Delivery result = deliveryService.save(delivery);
        return ResponseEntity
            .created(new URI("/api/deliveries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /deliveries/:id} : Updates an existing delivery.
     *
     * @param id the id of the delivery to save.
     * @param delivery the delivery to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated delivery,
     * or with status {@code 400 (Bad Request)} if the delivery is not valid,
     * or with status {@code 500 (Internal Server Error)} if the delivery couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Delivery> updateDelivery(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody Delivery delivery
    ) throws URISyntaxException {
        log.debug("REST request to update Delivery : {}, {}", id, delivery);
        if (delivery.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, delivery.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!deliveryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Delivery result = deliveryService.update(delivery);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, delivery.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /deliveries/:id} : Partial updates given fields of an existing delivery, field will ignore if it is null
     *
     * @param id the id of the delivery to save.
     * @param delivery the delivery to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated delivery,
     * or with status {@code 400 (Bad Request)} if the delivery is not valid,
     * or with status {@code 404 (Not Found)} if the delivery is not found,
     * or with status {@code 500 (Internal Server Error)} if the delivery couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Delivery> partialUpdateDelivery(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody Delivery delivery
    ) throws URISyntaxException {
        log.debug("REST request to partial update Delivery partially : {}, {}", id, delivery);
        if (delivery.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, delivery.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!deliveryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Delivery> result = deliveryService.partialUpdate(delivery);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, delivery.getId())
        );
    }

    /**
     * {@code GET  /deliveries} : get all the deliveries.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of deliveries in body.
     */
    @GetMapping("")
    public ResponseEntity<List<Delivery>> getAllDeliveries(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Deliveries");
        Page<Delivery> page = deliveryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /deliveries/:id} : get the "id" delivery.
     *
     * @param id the id of the delivery to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the delivery, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Delivery> getDelivery(@PathVariable("id") String id) {
        log.debug("REST request to get Delivery : {}", id);
        Optional<Delivery> delivery = deliveryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(delivery);
    }

    /**
     * {@code DELETE  /deliveries/:id} : delete the "id" delivery.
     *
     * @param id the id of the delivery to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDelivery(@PathVariable("id") String id) {
        log.debug("REST request to delete Delivery : {}", id);
        deliveryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}

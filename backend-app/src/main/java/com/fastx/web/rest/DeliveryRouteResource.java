package com.fastx.web.rest;

import com.fastx.domain.DeliveryRoute;
import com.fastx.repository.DeliveryRouteRepository;
import com.fastx.service.DeliveryRouteService;
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
 * REST controller for managing {@link com.fastx.domain.DeliveryRoute}.
 */
@RestController
@RequestMapping("/api/delivery-routes")
public class DeliveryRouteResource {

    private final Logger log = LoggerFactory.getLogger(DeliveryRouteResource.class);

    private static final String ENTITY_NAME = "deliveryRoute";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DeliveryRouteService deliveryRouteService;

    private final DeliveryRouteRepository deliveryRouteRepository;

    public DeliveryRouteResource(DeliveryRouteService deliveryRouteService, DeliveryRouteRepository deliveryRouteRepository) {
        this.deliveryRouteService = deliveryRouteService;
        this.deliveryRouteRepository = deliveryRouteRepository;
    }

    /**
     * {@code POST  /delivery-routes} : Create a new deliveryRoute.
     *
     * @param deliveryRoute the deliveryRoute to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new deliveryRoute, or with status {@code 400 (Bad Request)} if the deliveryRoute has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<DeliveryRoute> createDeliveryRoute(@RequestBody DeliveryRoute deliveryRoute) throws URISyntaxException {
        log.debug("REST request to save DeliveryRoute : {}", deliveryRoute);
        if (deliveryRoute.getId() != null) {
            throw new BadRequestAlertException("A new deliveryRoute cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DeliveryRoute result = deliveryRouteService.save(deliveryRoute);
        return ResponseEntity
            .created(new URI("/api/delivery-routes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /delivery-routes/:id} : Updates an existing deliveryRoute.
     *
     * @param id the id of the deliveryRoute to save.
     * @param deliveryRoute the deliveryRoute to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated deliveryRoute,
     * or with status {@code 400 (Bad Request)} if the deliveryRoute is not valid,
     * or with status {@code 500 (Internal Server Error)} if the deliveryRoute couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<DeliveryRoute> updateDeliveryRoute(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody DeliveryRoute deliveryRoute
    ) throws URISyntaxException {
        log.debug("REST request to update DeliveryRoute : {}, {}", id, deliveryRoute);
        if (deliveryRoute.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, deliveryRoute.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!deliveryRouteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DeliveryRoute result = deliveryRouteService.update(deliveryRoute);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, deliveryRoute.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /delivery-routes/:id} : Partial updates given fields of an existing deliveryRoute, field will ignore if it is null
     *
     * @param id the id of the deliveryRoute to save.
     * @param deliveryRoute the deliveryRoute to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated deliveryRoute,
     * or with status {@code 400 (Bad Request)} if the deliveryRoute is not valid,
     * or with status {@code 404 (Not Found)} if the deliveryRoute is not found,
     * or with status {@code 500 (Internal Server Error)} if the deliveryRoute couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DeliveryRoute> partialUpdateDeliveryRoute(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody DeliveryRoute deliveryRoute
    ) throws URISyntaxException {
        log.debug("REST request to partial update DeliveryRoute partially : {}, {}", id, deliveryRoute);
        if (deliveryRoute.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, deliveryRoute.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!deliveryRouteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DeliveryRoute> result = deliveryRouteService.partialUpdate(deliveryRoute);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, deliveryRoute.getId())
        );
    }

    /**
     * {@code GET  /delivery-routes} : get all the deliveryRoutes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of deliveryRoutes in body.
     */
    @GetMapping("")
    public ResponseEntity<List<DeliveryRoute>> getAllDeliveryRoutes(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of DeliveryRoutes");
        Page<DeliveryRoute> page = deliveryRouteService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /delivery-routes/:id} : get the "id" deliveryRoute.
     *
     * @param id the id of the deliveryRoute to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the deliveryRoute, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<DeliveryRoute> getDeliveryRoute(@PathVariable("id") String id) {
        log.debug("REST request to get DeliveryRoute : {}", id);
        Optional<DeliveryRoute> deliveryRoute = deliveryRouteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(deliveryRoute);
    }

    /**
     * {@code DELETE  /delivery-routes/:id} : delete the "id" deliveryRoute.
     *
     * @param id the id of the deliveryRoute to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeliveryRoute(@PathVariable("id") String id) {
        log.debug("REST request to delete DeliveryRoute : {}", id);
        deliveryRouteService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}

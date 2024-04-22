package com.fastx.service.impl;

import com.fastx.domain.DeliveryRoute;
import com.fastx.repository.DeliveryRouteRepository;
import com.fastx.service.DeliveryRouteService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link com.fastx.domain.DeliveryRoute}.
 */
@Service
public class DeliveryRouteServiceImpl implements DeliveryRouteService {

    private final Logger log = LoggerFactory.getLogger(DeliveryRouteServiceImpl.class);

    private final DeliveryRouteRepository deliveryRouteRepository;

    public DeliveryRouteServiceImpl(DeliveryRouteRepository deliveryRouteRepository) {
        this.deliveryRouteRepository = deliveryRouteRepository;
    }

    @Override
    public DeliveryRoute save(DeliveryRoute deliveryRoute) {
        log.debug("Request to save DeliveryRoute : {}", deliveryRoute);
        return deliveryRouteRepository.save(deliveryRoute);
    }

    @Override
    public DeliveryRoute update(DeliveryRoute deliveryRoute) {
        log.debug("Request to update DeliveryRoute : {}", deliveryRoute);
        return deliveryRouteRepository.save(deliveryRoute);
    }

    @Override
    public Optional<DeliveryRoute> partialUpdate(DeliveryRoute deliveryRoute) {
        log.debug("Request to partially update DeliveryRoute : {}", deliveryRoute);

        return deliveryRouteRepository
            .findById(deliveryRoute.getId())
            .map(existingDeliveryRoute -> {
                if (deliveryRoute.getDeliveryRouteId() != null) {
                    existingDeliveryRoute.setDeliveryRouteId(deliveryRoute.getDeliveryRouteId());
                }
                if (deliveryRoute.getEstimatedTravelTime() != null) {
                    existingDeliveryRoute.setEstimatedTravelTime(deliveryRoute.getEstimatedTravelTime());
                }
                if (deliveryRoute.getSpecialInstructions() != null) {
                    existingDeliveryRoute.setSpecialInstructions(deliveryRoute.getSpecialInstructions());
                }

                return existingDeliveryRoute;
            })
            .map(deliveryRouteRepository::save);
    }

    @Override
    public Page<DeliveryRoute> findAll(Pageable pageable) {
        log.debug("Request to get all DeliveryRoutes");
        return deliveryRouteRepository.findAll(pageable);
    }

    @Override
    public Optional<DeliveryRoute> findOne(String id) {
        log.debug("Request to get DeliveryRoute : {}", id);
        return deliveryRouteRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete DeliveryRoute : {}", id);
        deliveryRouteRepository.deleteById(id);
    }
}

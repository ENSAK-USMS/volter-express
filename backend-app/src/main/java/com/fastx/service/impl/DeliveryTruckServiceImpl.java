package com.fastx.service.impl;

import com.fastx.domain.DeliveryTruck;
import com.fastx.repository.DeliveryTruckRepository;
import com.fastx.service.DeliveryTruckService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link com.fastx.domain.DeliveryTruck}.
 */
@Service
public class DeliveryTruckServiceImpl implements DeliveryTruckService {

    private final Logger log = LoggerFactory.getLogger(DeliveryTruckServiceImpl.class);

    private final DeliveryTruckRepository deliveryTruckRepository;

    public DeliveryTruckServiceImpl(DeliveryTruckRepository deliveryTruckRepository) {
        this.deliveryTruckRepository = deliveryTruckRepository;
    }

    @Override
    public DeliveryTruck save(DeliveryTruck deliveryTruck) {
        log.debug("Request to save DeliveryTruck : {}", deliveryTruck);
        return deliveryTruckRepository.save(deliveryTruck);
    }

    @Override
    public DeliveryTruck update(DeliveryTruck deliveryTruck) {
        log.debug("Request to update DeliveryTruck : {}", deliveryTruck);
        return deliveryTruckRepository.save(deliveryTruck);
    }

    @Override
    public Optional<DeliveryTruck> partialUpdate(DeliveryTruck deliveryTruck) {
        log.debug("Request to partially update DeliveryTruck : {}", deliveryTruck);

        return deliveryTruckRepository
            .findById(deliveryTruck.getId())
            .map(existingDeliveryTruck -> {
                if (deliveryTruck.getDeliveryTruckId() != null) {
                    existingDeliveryTruck.setDeliveryTruckId(deliveryTruck.getDeliveryTruckId());
                }
                if (deliveryTruck.getCapacityKg() != null) {
                    existingDeliveryTruck.setCapacityKg(deliveryTruck.getCapacityKg());
                }
                if (deliveryTruck.getCurrentLocation() != null) {
                    existingDeliveryTruck.setCurrentLocation(deliveryTruck.getCurrentLocation());
                }
                if (deliveryTruck.getStatus() != null) {
                    existingDeliveryTruck.setStatus(deliveryTruck.getStatus());
                }
                if (deliveryTruck.getDriverName() != null) {
                    existingDeliveryTruck.setDriverName(deliveryTruck.getDriverName());
                }
                if (deliveryTruck.getDriverContact() != null) {
                    existingDeliveryTruck.setDriverContact(deliveryTruck.getDriverContact());
                }
                if (deliveryTruck.getLicensePlate() != null) {
                    existingDeliveryTruck.setLicensePlate(deliveryTruck.getLicensePlate());
                }

                return existingDeliveryTruck;
            })
            .map(deliveryTruckRepository::save);
    }

    @Override
    public List<DeliveryTruck> findAll() {
        log.debug("Request to get all DeliveryTrucks");
        return deliveryTruckRepository.findAll();
    }

    @Override
    public Optional<DeliveryTruck> findOne(String id) {
        log.debug("Request to get DeliveryTruck : {}", id);
        return deliveryTruckRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete DeliveryTruck : {}", id);
        deliveryTruckRepository.deleteById(id);
    }

    @Override
    public List<Float> getCurrentLocation() {
        return deliveryTruckRepository.getCurrentLocation();
    }
}

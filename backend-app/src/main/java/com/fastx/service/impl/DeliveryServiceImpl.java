package com.fastx.service.impl;

import com.fastx.domain.Delivery;
import com.fastx.domain.DeliveryTruck;
import com.fastx.repository.DeliveryRepository;
import com.fastx.repository.DeliveryTruckRepository;
import com.fastx.service.DeliveryService;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link com.fastx.domain.Delivery}.
 */
@Service
public class DeliveryServiceImpl implements DeliveryService {

    private final Logger log = LoggerFactory.getLogger(DeliveryServiceImpl.class);

    private final DeliveryRepository deliveryRepository;
    private final DeliveryTruckRepository truckRepository;

    public DeliveryServiceImpl(DeliveryRepository deliveryRepository, DeliveryTruckRepository truckRepository) {
        this.deliveryRepository = deliveryRepository;
        this.truckRepository = truckRepository;
    }

    @Override
    public Delivery save(Delivery delivery) {
        log.debug("Request to save Delivery : {}", delivery);
        return deliveryRepository.save(delivery);
    }

    @Override
    public Delivery update(Delivery delivery) {
        log.debug("Request to update Delivery : {}", delivery);
        return deliveryRepository.save(delivery);
    }

    @Override
    public Optional<Delivery> partialUpdate(Delivery delivery) {
        log.debug("Request to partially update Delivery : {}", delivery);

        return deliveryRepository
            .findById(delivery.getId())
            .map(existingDelivery -> {
                if (delivery.getDeliveryDate() != null) {
                    existingDelivery.setDeliveryDate(delivery.getDeliveryDate());
                }
                if (delivery.getOrderId() != null) {
                    existingDelivery.setOrderId(delivery.getOrderId());
                }
                if (delivery.getDeliveryRouteId() != null) {
                    existingDelivery.setDeliveryRouteId(delivery.getDeliveryRouteId());
                }
                if (delivery.getEstimatedTravelTime() != null) {
                    existingDelivery.setEstimatedTravelTime(delivery.getEstimatedTravelTime());
                }
                if (delivery.getDeliveryTruckId() != null) {
                    existingDelivery.setDeliveryTruckId(delivery.getDeliveryTruckId());
                }
                if (delivery.getReceiverId() != null) {
                    existingDelivery.setReceiverId(delivery.getReceiverId());
                }
                if (delivery.getOrderTruckingNumber() != null) {
                    existingDelivery.setOrderTruckingNumber(delivery.getOrderTruckingNumber());
                }

                return existingDelivery;
            })
            .map(deliveryRepository::save);
    }

    @Override
    public Page<Delivery> findAll(Pageable pageable) {
        log.debug("Request to get all Deliveries");
        return deliveryRepository.findAll(pageable);
    }

    @Override
    public Optional<Delivery> findOne(String id) {
        log.debug("Request to get Delivery : {}", id);
        return deliveryRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Delivery : {}", id);
        deliveryRepository.deleteById(id);
    }

    @Override
    public List<Float> getTruckLocationByTrackingNumber(Long trackingNumber) {
        Delivery delivery = deliveryRepository.findDeliveryByOrderTruckingNumber(trackingNumber);

        // get truck id
        Long truckId = delivery.getDeliveryTruckId();

        // get truck location
        return truckRepository.getTruckLocationById(truckId);
    }
}

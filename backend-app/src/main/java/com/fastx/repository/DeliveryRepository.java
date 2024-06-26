package com.fastx.repository;

import com.fastx.domain.Delivery;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Delivery entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeliveryRepository extends MongoRepository<Delivery, String> {

    Delivery findDeliveryByOrderTruckingNumber(Long trackingNumber);

}

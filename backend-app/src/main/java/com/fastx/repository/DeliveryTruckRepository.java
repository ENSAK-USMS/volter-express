package com.fastx.repository;

import com.fastx.domain.DeliveryTruck;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the DeliveryTruck entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeliveryTruckRepository extends MongoRepository<DeliveryTruck, String> {

    // get truck by id and current location
    Optional<DeliveryTruck> findById(String id);
}

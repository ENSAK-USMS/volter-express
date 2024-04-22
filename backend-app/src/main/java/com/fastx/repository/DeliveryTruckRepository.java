package com.fastx.repository;

import com.fastx.domain.DeliveryTruck;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the DeliveryTruck entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeliveryTruckRepository extends MongoRepository<DeliveryTruck, String> {}

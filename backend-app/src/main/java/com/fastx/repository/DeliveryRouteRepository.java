package com.fastx.repository;

import com.fastx.domain.DeliveryRoute;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the DeliveryRoute entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeliveryRouteRepository extends MongoRepository<DeliveryRoute, String> {}

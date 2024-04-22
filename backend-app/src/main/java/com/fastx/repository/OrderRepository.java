package com.fastx.repository;

import com.fastx.domain.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Order entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderRepository extends MongoRepository<Order, String> {}

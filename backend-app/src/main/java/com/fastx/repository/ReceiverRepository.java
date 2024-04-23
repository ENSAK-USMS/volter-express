package com.fastx.repository;

import com.fastx.domain.DeliveryTruck;
import com.fastx.domain.Receiver;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Receiver entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReceiverRepository extends MongoRepository<Receiver, String> {

}

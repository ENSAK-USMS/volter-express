package com.fastx.service.impl;

import com.fastx.domain.Receiver;
import com.fastx.repository.ReceiverRepository;
import com.fastx.service.ReceiverService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link com.fastx.domain.Receiver}.
 */
@Service
public class ReceiverServiceImpl implements ReceiverService {

    private final Logger log = LoggerFactory.getLogger(ReceiverServiceImpl.class);

    private final ReceiverRepository receiverRepository;

    public ReceiverServiceImpl(ReceiverRepository receiverRepository) {
        this.receiverRepository = receiverRepository;
    }

    @Override
    public Receiver save(Receiver receiver) {
        log.debug("Request to save Receiver : {}", receiver);
        return receiverRepository.save(receiver);
    }

    @Override
    public Receiver update(Receiver receiver) {
        log.debug("Request to update Receiver : {}", receiver);
        return receiverRepository.save(receiver);
    }

    @Override
    public Optional<Receiver> partialUpdate(Receiver receiver) {
        log.debug("Request to partially update Receiver : {}", receiver);

        return receiverRepository
            .findById(receiver.getId())
            .map(existingReceiver -> {
                if (receiver.getName() != null) {
                    existingReceiver.setName(receiver.getName());
                }
                if (receiver.getCountry() != null) {
                    existingReceiver.setCountry(receiver.getCountry());
                }
                if (receiver.getCity() != null) {
                    existingReceiver.setCity(receiver.getCity());
                }
                if (receiver.getEmail() != null) {
                    existingReceiver.setEmail(receiver.getEmail());
                }
                if (receiver.getPhone() != null) {
                    existingReceiver.setPhone(receiver.getPhone());
                }
                if (receiver.getStreetName() != null) {
                    existingReceiver.setStreetName(receiver.getStreetName());
                }
                if (receiver.getLocation() != null) {
                    existingReceiver.setLocation(receiver.getLocation());
                }

                return existingReceiver;
            })
            .map(receiverRepository::save);
    }

    @Override
    public List<Receiver> findAll() {
        log.debug("Request to get all Receivers");
        return receiverRepository.findAll();
    }

    @Override
    public Optional<Receiver> findOne(String id) {
        log.debug("Request to get Receiver : {}", id);
        return receiverRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Receiver : {}", id);
        receiverRepository.deleteById(id);
    }
}

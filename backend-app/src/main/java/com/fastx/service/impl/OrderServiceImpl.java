package com.fastx.service.impl;

import com.fastx.domain.Order;
import com.fastx.repository.OrderRepository;
import com.fastx.service.OrderService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link com.fastx.domain.Order}.
 */
@Service
public class OrderServiceImpl implements OrderService {

    private final Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Order save(Order order) {
        log.debug("Request to save Order : {}", order);
        return orderRepository.save(order);
    }

    @Override
    public Order update(Order order) {
        log.debug("Request to update Order : {}", order);
        return orderRepository.save(order);
    }

    @Override
    public Optional<Order> partialUpdate(Order order) {
        log.debug("Request to partially update Order : {}", order);

        return orderRepository
            .findById(order.getId())
            .map(existingOrder -> {
                if (order.getOrderId() != null) {
                    existingOrder.setOrderId(order.getOrderId());
                }
                if (order.getOrderDate() != null) {
                    existingOrder.setOrderDate(order.getOrderDate());
                }
                if (order.getTotalAmount() != null) {
                    existingOrder.setTotalAmount(order.getTotalAmount());
                }
                if (order.getWeightKg() != null) {
                    existingOrder.setWeightKg(order.getWeightKg());
                }
                if (order.getStatus() != null) {
                    existingOrder.setStatus(order.getStatus());
                }
                if (order.getExpirationDate() != null) {
                    existingOrder.setExpirationDate(order.getExpirationDate());
                }
                if (order.getDeliveryId() != null) {
                    existingOrder.setDeliveryId(order.getDeliveryId());
                }

                return existingOrder;
            })
            .map(orderRepository::save);
    }

    @Override
    public Page<Order> findAll(Pageable pageable) {
        log.debug("Request to get all Orders");
        return orderRepository.findAll(pageable);
    }

    @Override
    public Optional<Order> findOne(String id) {
        log.debug("Request to get Order : {}", id);
        return orderRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Order : {}", id);
        orderRepository.deleteById(id);
    }
}

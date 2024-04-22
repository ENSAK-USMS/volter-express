package com.fastx.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fastx.IntegrationTest;
import com.fastx.domain.Order;
import com.fastx.repository.OrderRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the {@link OrderResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OrderResourceIT {

    private static final Long DEFAULT_ORDER_ID = 1L;
    private static final Long UPDATED_ORDER_ID = 2L;

    private static final Instant DEFAULT_ORDER_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ORDER_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Float DEFAULT_TOTAL_AMOUNT = 1F;
    private static final Float UPDATED_TOTAL_AMOUNT = 2F;

    private static final Float DEFAULT_WEIGHT_KG = 1F;
    private static final Float UPDATED_WEIGHT_KG = 2F;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final Instant DEFAULT_EXPIRATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_EXPIRATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_DELIVERY_ID = 1L;
    private static final Long UPDATED_DELIVERY_ID = 2L;

    private static final String ENTITY_API_URL = "/api/orders";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MockMvc restOrderMockMvc;

    private Order order;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Order createEntity() {
        Order order = new Order()
            .orderId(DEFAULT_ORDER_ID)
            .orderDate(DEFAULT_ORDER_DATE)
            .totalAmount(DEFAULT_TOTAL_AMOUNT)
            .weightKg(DEFAULT_WEIGHT_KG)
            .status(DEFAULT_STATUS)
            .expirationDate(DEFAULT_EXPIRATION_DATE)
            .deliveryId(DEFAULT_DELIVERY_ID);
        return order;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Order createUpdatedEntity() {
        Order order = new Order()
            .orderId(UPDATED_ORDER_ID)
            .orderDate(UPDATED_ORDER_DATE)
            .totalAmount(UPDATED_TOTAL_AMOUNT)
            .weightKg(UPDATED_WEIGHT_KG)
            .status(UPDATED_STATUS)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .deliveryId(UPDATED_DELIVERY_ID);
        return order;
    }

    @BeforeEach
    public void initTest() {
        orderRepository.deleteAll();
        order = createEntity();
    }

    @Test
    void createOrder() throws Exception {
        int databaseSizeBeforeCreate = orderRepository.findAll().size();
        // Create the Order
        restOrderMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(order)))
            .andExpect(status().isCreated());

        // Validate the Order in the database
        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeCreate + 1);
        Order testOrder = orderList.get(orderList.size() - 1);
        assertThat(testOrder.getOrderId()).isEqualTo(DEFAULT_ORDER_ID);
        assertThat(testOrder.getOrderDate()).isEqualTo(DEFAULT_ORDER_DATE);
        assertThat(testOrder.getTotalAmount()).isEqualTo(DEFAULT_TOTAL_AMOUNT);
        assertThat(testOrder.getWeightKg()).isEqualTo(DEFAULT_WEIGHT_KG);
        assertThat(testOrder.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testOrder.getExpirationDate()).isEqualTo(DEFAULT_EXPIRATION_DATE);
        assertThat(testOrder.getDeliveryId()).isEqualTo(DEFAULT_DELIVERY_ID);
    }

    @Test
    void createOrderWithExistingId() throws Exception {
        // Create the Order with an existing ID
        order.setId("existing_id");

        int databaseSizeBeforeCreate = orderRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(order)))
            .andExpect(status().isBadRequest());

        // Validate the Order in the database
        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllOrders() throws Exception {
        // Initialize the database
        orderRepository.save(order);

        // Get all the orderList
        restOrderMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(order.getId())))
            .andExpect(jsonPath("$.[*].orderId").value(hasItem(DEFAULT_ORDER_ID.intValue())))
            .andExpect(jsonPath("$.[*].orderDate").value(hasItem(DEFAULT_ORDER_DATE.toString())))
            .andExpect(jsonPath("$.[*].totalAmount").value(hasItem(DEFAULT_TOTAL_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].weightKg").value(hasItem(DEFAULT_WEIGHT_KG.doubleValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].expirationDate").value(hasItem(DEFAULT_EXPIRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].deliveryId").value(hasItem(DEFAULT_DELIVERY_ID.intValue())));
    }

    @Test
    void getOrder() throws Exception {
        // Initialize the database
        orderRepository.save(order);

        // Get the order
        restOrderMockMvc
            .perform(get(ENTITY_API_URL_ID, order.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(order.getId()))
            .andExpect(jsonPath("$.orderId").value(DEFAULT_ORDER_ID.intValue()))
            .andExpect(jsonPath("$.orderDate").value(DEFAULT_ORDER_DATE.toString()))
            .andExpect(jsonPath("$.totalAmount").value(DEFAULT_TOTAL_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.weightKg").value(DEFAULT_WEIGHT_KG.doubleValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.expirationDate").value(DEFAULT_EXPIRATION_DATE.toString()))
            .andExpect(jsonPath("$.deliveryId").value(DEFAULT_DELIVERY_ID.intValue()));
    }

    @Test
    void getNonExistingOrder() throws Exception {
        // Get the order
        restOrderMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingOrder() throws Exception {
        // Initialize the database
        orderRepository.save(order);

        int databaseSizeBeforeUpdate = orderRepository.findAll().size();

        // Update the order
        Order updatedOrder = orderRepository.findById(order.getId()).orElseThrow();
        updatedOrder
            .orderId(UPDATED_ORDER_ID)
            .orderDate(UPDATED_ORDER_DATE)
            .totalAmount(UPDATED_TOTAL_AMOUNT)
            .weightKg(UPDATED_WEIGHT_KG)
            .status(UPDATED_STATUS)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .deliveryId(UPDATED_DELIVERY_ID);

        restOrderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOrder.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedOrder))
            )
            .andExpect(status().isOk());

        // Validate the Order in the database
        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeUpdate);
        Order testOrder = orderList.get(orderList.size() - 1);
        assertThat(testOrder.getOrderId()).isEqualTo(UPDATED_ORDER_ID);
        assertThat(testOrder.getOrderDate()).isEqualTo(UPDATED_ORDER_DATE);
        assertThat(testOrder.getTotalAmount()).isEqualTo(UPDATED_TOTAL_AMOUNT);
        assertThat(testOrder.getWeightKg()).isEqualTo(UPDATED_WEIGHT_KG);
        assertThat(testOrder.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testOrder.getExpirationDate()).isEqualTo(UPDATED_EXPIRATION_DATE);
        assertThat(testOrder.getDeliveryId()).isEqualTo(UPDATED_DELIVERY_ID);
    }

    @Test
    void putNonExistingOrder() throws Exception {
        int databaseSizeBeforeUpdate = orderRepository.findAll().size();
        order.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, order.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(order))
            )
            .andExpect(status().isBadRequest());

        // Validate the Order in the database
        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchOrder() throws Exception {
        int databaseSizeBeforeUpdate = orderRepository.findAll().size();
        order.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrderMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(order))
            )
            .andExpect(status().isBadRequest());

        // Validate the Order in the database
        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamOrder() throws Exception {
        int databaseSizeBeforeUpdate = orderRepository.findAll().size();
        order.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrderMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(order)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Order in the database
        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateOrderWithPatch() throws Exception {
        // Initialize the database
        orderRepository.save(order);

        int databaseSizeBeforeUpdate = orderRepository.findAll().size();

        // Update the order using partial update
        Order partialUpdatedOrder = new Order();
        partialUpdatedOrder.setId(order.getId());

        partialUpdatedOrder.totalAmount(UPDATED_TOTAL_AMOUNT).status(UPDATED_STATUS).expirationDate(UPDATED_EXPIRATION_DATE);

        restOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOrder.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOrder))
            )
            .andExpect(status().isOk());

        // Validate the Order in the database
        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeUpdate);
        Order testOrder = orderList.get(orderList.size() - 1);
        assertThat(testOrder.getOrderId()).isEqualTo(DEFAULT_ORDER_ID);
        assertThat(testOrder.getOrderDate()).isEqualTo(DEFAULT_ORDER_DATE);
        assertThat(testOrder.getTotalAmount()).isEqualTo(UPDATED_TOTAL_AMOUNT);
        assertThat(testOrder.getWeightKg()).isEqualTo(DEFAULT_WEIGHT_KG);
        assertThat(testOrder.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testOrder.getExpirationDate()).isEqualTo(UPDATED_EXPIRATION_DATE);
        assertThat(testOrder.getDeliveryId()).isEqualTo(DEFAULT_DELIVERY_ID);
    }

    @Test
    void fullUpdateOrderWithPatch() throws Exception {
        // Initialize the database
        orderRepository.save(order);

        int databaseSizeBeforeUpdate = orderRepository.findAll().size();

        // Update the order using partial update
        Order partialUpdatedOrder = new Order();
        partialUpdatedOrder.setId(order.getId());

        partialUpdatedOrder
            .orderId(UPDATED_ORDER_ID)
            .orderDate(UPDATED_ORDER_DATE)
            .totalAmount(UPDATED_TOTAL_AMOUNT)
            .weightKg(UPDATED_WEIGHT_KG)
            .status(UPDATED_STATUS)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .deliveryId(UPDATED_DELIVERY_ID);

        restOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOrder.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOrder))
            )
            .andExpect(status().isOk());

        // Validate the Order in the database
        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeUpdate);
        Order testOrder = orderList.get(orderList.size() - 1);
        assertThat(testOrder.getOrderId()).isEqualTo(UPDATED_ORDER_ID);
        assertThat(testOrder.getOrderDate()).isEqualTo(UPDATED_ORDER_DATE);
        assertThat(testOrder.getTotalAmount()).isEqualTo(UPDATED_TOTAL_AMOUNT);
        assertThat(testOrder.getWeightKg()).isEqualTo(UPDATED_WEIGHT_KG);
        assertThat(testOrder.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testOrder.getExpirationDate()).isEqualTo(UPDATED_EXPIRATION_DATE);
        assertThat(testOrder.getDeliveryId()).isEqualTo(UPDATED_DELIVERY_ID);
    }

    @Test
    void patchNonExistingOrder() throws Exception {
        int databaseSizeBeforeUpdate = orderRepository.findAll().size();
        order.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, order.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(order))
            )
            .andExpect(status().isBadRequest());

        // Validate the Order in the database
        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchOrder() throws Exception {
        int databaseSizeBeforeUpdate = orderRepository.findAll().size();
        order.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(order))
            )
            .andExpect(status().isBadRequest());

        // Validate the Order in the database
        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamOrder() throws Exception {
        int databaseSizeBeforeUpdate = orderRepository.findAll().size();
        order.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrderMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(order)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Order in the database
        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteOrder() throws Exception {
        // Initialize the database
        orderRepository.save(order);

        int databaseSizeBeforeDelete = orderRepository.findAll().size();

        // Delete the order
        restOrderMockMvc
            .perform(delete(ENTITY_API_URL_ID, order.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

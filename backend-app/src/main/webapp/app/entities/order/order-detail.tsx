import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './order.reducer';

export const OrderDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const orderEntity = useAppSelector(state => state.order.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="orderDetailsHeading">
          <Translate contentKey="fastxApp.order.detail.title">Order</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{orderEntity.id}</dd>
          <dt>
            <span id="orderId">
              <Translate contentKey="fastxApp.order.orderId">Order Id</Translate>
            </span>
          </dt>
          <dd>{orderEntity.orderId}</dd>
          <dt>
            <span id="orderDate">
              <Translate contentKey="fastxApp.order.orderDate">Order Date</Translate>
            </span>
          </dt>
          <dd>{orderEntity.orderDate ? <TextFormat value={orderEntity.orderDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="totalAmount">
              <Translate contentKey="fastxApp.order.totalAmount">Total Amount</Translate>
            </span>
          </dt>
          <dd>{orderEntity.totalAmount}</dd>
          <dt>
            <span id="weightKg">
              <Translate contentKey="fastxApp.order.weightKg">Weight Kg</Translate>
            </span>
          </dt>
          <dd>{orderEntity.weightKg}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="fastxApp.order.status">Status</Translate>
            </span>
          </dt>
          <dd>{orderEntity.status}</dd>
          <dt>
            <span id="expirationDate">
              <Translate contentKey="fastxApp.order.expirationDate">Expiration Date</Translate>
            </span>
          </dt>
          <dd>
            {orderEntity.expirationDate ? <TextFormat value={orderEntity.expirationDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="deliveryId">
              <Translate contentKey="fastxApp.order.deliveryId">Delivery Id</Translate>
            </span>
          </dt>
          <dd>{orderEntity.deliveryId}</dd>
        </dl>
        <Button tag={Link} to="/order" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order/${orderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrderDetail;

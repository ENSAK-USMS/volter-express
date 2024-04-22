import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './delivery.reducer';

export const DeliveryDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const deliveryEntity = useAppSelector(state => state.delivery.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="deliveryDetailsHeading">
          <Translate contentKey="fastxApp.delivery.detail.title">Delivery</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{deliveryEntity.id}</dd>
          <dt>
            <span id="deliveryDate">
              <Translate contentKey="fastxApp.delivery.deliveryDate">Delivery Date</Translate>
            </span>
          </dt>
          <dd>
            {deliveryEntity.deliveryDate ? <TextFormat value={deliveryEntity.deliveryDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="orderId">
              <Translate contentKey="fastxApp.delivery.orderId">Order Id</Translate>
            </span>
          </dt>
          <dd>{deliveryEntity.orderId}</dd>
          <dt>
            <span id="deliveryAddressId">
              <Translate contentKey="fastxApp.delivery.deliveryAddressId">Delivery Address Id</Translate>
            </span>
          </dt>
          <dd>{deliveryEntity.deliveryAddressId}</dd>
          <dt>
            <span id="deliveryRouteId">
              <Translate contentKey="fastxApp.delivery.deliveryRouteId">Delivery Route Id</Translate>
            </span>
          </dt>
          <dd>{deliveryEntity.deliveryRouteId}</dd>
          <dt>
            <span id="estimatedTravelTime">
              <Translate contentKey="fastxApp.delivery.estimatedTravelTime">Estimated Travel Time</Translate>
            </span>
          </dt>
          <dd>{deliveryEntity.estimatedTravelTime}</dd>
          <dt>
            <span id="deliveryTruckId">
              <Translate contentKey="fastxApp.delivery.deliveryTruckId">Delivery Truck Id</Translate>
            </span>
          </dt>
          <dd>{deliveryEntity.deliveryTruckId}</dd>
          <dt>
            <span id="receiverId">
              <Translate contentKey="fastxApp.delivery.receiverId">Receiver Id</Translate>
            </span>
          </dt>
          <dd>{deliveryEntity.receiverId}</dd>
          <dt>
            <span id="orderTruckingNumber">
              <Translate contentKey="fastxApp.delivery.orderTruckingNumber">Order Trucking Number</Translate>
            </span>
          </dt>
          <dd>{deliveryEntity.orderTruckingNumber}</dd>
        </dl>
        <Button tag={Link} to="/delivery" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/delivery/${deliveryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default DeliveryDetail;

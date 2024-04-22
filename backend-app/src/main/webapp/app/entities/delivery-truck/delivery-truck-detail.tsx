import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './delivery-truck.reducer';

export const DeliveryTruckDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const deliveryTruckEntity = useAppSelector(state => state.deliveryTruck.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="deliveryTruckDetailsHeading">
          <Translate contentKey="fastxApp.deliveryTruck.detail.title">DeliveryTruck</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{deliveryTruckEntity.id}</dd>
          <dt>
            <span id="deliveryTruckId">
              <Translate contentKey="fastxApp.deliveryTruck.deliveryTruckId">Delivery Truck Id</Translate>
            </span>
          </dt>
          <dd>{deliveryTruckEntity.deliveryTruckId}</dd>
          <dt>
            <span id="capacityKg">
              <Translate contentKey="fastxApp.deliveryTruck.capacityKg">Capacity Kg</Translate>
            </span>
          </dt>
          <dd>{deliveryTruckEntity.capacityKg}</dd>
          <dt>
            <span id="currentLocation">
              <Translate contentKey="fastxApp.deliveryTruck.currentLocation">Current Location</Translate>
            </span>
          </dt>
          <dd>{deliveryTruckEntity.currentLocation}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="fastxApp.deliveryTruck.status">Status</Translate>
            </span>
          </dt>
          <dd>{deliveryTruckEntity.status}</dd>
          <dt>
            <span id="driverName">
              <Translate contentKey="fastxApp.deliveryTruck.driverName">Driver Name</Translate>
            </span>
          </dt>
          <dd>{deliveryTruckEntity.driverName}</dd>
          <dt>
            <span id="driverContact">
              <Translate contentKey="fastxApp.deliveryTruck.driverContact">Driver Contact</Translate>
            </span>
          </dt>
          <dd>{deliveryTruckEntity.driverContact}</dd>
          <dt>
            <span id="licensePlate">
              <Translate contentKey="fastxApp.deliveryTruck.licensePlate">License Plate</Translate>
            </span>
          </dt>
          <dd>{deliveryTruckEntity.licensePlate}</dd>
        </dl>
        <Button tag={Link} to="/delivery-truck" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/delivery-truck/${deliveryTruckEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default DeliveryTruckDetail;

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './delivery-route.reducer';

export const DeliveryRouteDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const deliveryRouteEntity = useAppSelector(state => state.deliveryRoute.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="deliveryRouteDetailsHeading">
          <Translate contentKey="fastxApp.deliveryRoute.detail.title">DeliveryRoute</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{deliveryRouteEntity.id}</dd>
          <dt>
            <span id="deliveryRouteId">
              <Translate contentKey="fastxApp.deliveryRoute.deliveryRouteId">Delivery Route Id</Translate>
            </span>
          </dt>
          <dd>{deliveryRouteEntity.deliveryRouteId}</dd>
          <dt>
            <span id="estimatedTravelTime">
              <Translate contentKey="fastxApp.deliveryRoute.estimatedTravelTime">Estimated Travel Time</Translate>
            </span>
          </dt>
          <dd>{deliveryRouteEntity.estimatedTravelTime}</dd>
          <dt>
            <span id="specialInstructions">
              <Translate contentKey="fastxApp.deliveryRoute.specialInstructions">Special Instructions</Translate>
            </span>
          </dt>
          <dd>{deliveryRouteEntity.specialInstructions}</dd>
        </dl>
        <Button tag={Link} to="/delivery-route" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/delivery-route/${deliveryRouteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default DeliveryRouteDetail;

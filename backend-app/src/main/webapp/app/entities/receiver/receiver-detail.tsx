import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './receiver.reducer';

export const ReceiverDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const receiverEntity = useAppSelector(state => state.receiver.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="receiverDetailsHeading">
          <Translate contentKey="fastxApp.receiver.detail.title">Receiver</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{receiverEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="fastxApp.receiver.name">Name</Translate>
            </span>
          </dt>
          <dd>{receiverEntity.name}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="fastxApp.receiver.country">Country</Translate>
            </span>
          </dt>
          <dd>{receiverEntity.country}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="fastxApp.receiver.city">City</Translate>
            </span>
          </dt>
          <dd>{receiverEntity.city}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="fastxApp.receiver.email">Email</Translate>
            </span>
          </dt>
          <dd>{receiverEntity.email}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="fastxApp.receiver.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{receiverEntity.phone}</dd>
          <dt>
            <span id="streetName">
              <Translate contentKey="fastxApp.receiver.streetName">Street Name</Translate>
            </span>
          </dt>
          <dd>{receiverEntity.streetName}</dd>
          <dt>
            <span id="location">
              <Translate contentKey="fastxApp.receiver.location">Location</Translate>
            </span>
          </dt>
          <dd>{receiverEntity.location}</dd>
        </dl>
        <Button tag={Link} to="/receiver" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/receiver/${receiverEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ReceiverDetail;

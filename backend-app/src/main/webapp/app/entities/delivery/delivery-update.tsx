import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDelivery } from 'app/shared/model/delivery.model';
import { getEntity, updateEntity, createEntity, reset } from './delivery.reducer';

export const DeliveryUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const deliveryEntity = useAppSelector(state => state.delivery.entity);
  const loading = useAppSelector(state => state.delivery.loading);
  const updating = useAppSelector(state => state.delivery.updating);
  const updateSuccess = useAppSelector(state => state.delivery.updateSuccess);

  const handleClose = () => {
    navigate('/delivery' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    values.deliveryDate = convertDateTimeToServer(values.deliveryDate);
    if (values.orderId !== undefined && typeof values.orderId !== 'number') {
      values.orderId = Number(values.orderId);
    }
    if (values.deliveryAddressId !== undefined && typeof values.deliveryAddressId !== 'number') {
      values.deliveryAddressId = Number(values.deliveryAddressId);
    }
    if (values.deliveryRouteId !== undefined && typeof values.deliveryRouteId !== 'number') {
      values.deliveryRouteId = Number(values.deliveryRouteId);
    }
    if (values.estimatedTravelTime !== undefined && typeof values.estimatedTravelTime !== 'number') {
      values.estimatedTravelTime = Number(values.estimatedTravelTime);
    }
    if (values.deliveryTruckId !== undefined && typeof values.deliveryTruckId !== 'number') {
      values.deliveryTruckId = Number(values.deliveryTruckId);
    }
    if (values.receiverId !== undefined && typeof values.receiverId !== 'number') {
      values.receiverId = Number(values.receiverId);
    }
    if (values.orderTruckingNumber !== undefined && typeof values.orderTruckingNumber !== 'number') {
      values.orderTruckingNumber = Number(values.orderTruckingNumber);
    }

    const entity = {
      ...deliveryEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          deliveryDate: displayDefaultDateTime(),
        }
      : {
          ...deliveryEntity,
          deliveryDate: convertDateTimeFromServer(deliveryEntity.deliveryDate),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="fastxApp.delivery.home.createOrEditLabel" data-cy="DeliveryCreateUpdateHeading">
            <Translate contentKey="fastxApp.delivery.home.createOrEditLabel">Create or edit a Delivery</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="delivery-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('fastxApp.delivery.deliveryDate')}
                id="delivery-deliveryDate"
                name="deliveryDate"
                data-cy="deliveryDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('fastxApp.delivery.orderId')}
                id="delivery-orderId"
                name="orderId"
                data-cy="orderId"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.delivery.deliveryAddressId')}
                id="delivery-deliveryAddressId"
                name="deliveryAddressId"
                data-cy="deliveryAddressId"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.delivery.deliveryRouteId')}
                id="delivery-deliveryRouteId"
                name="deliveryRouteId"
                data-cy="deliveryRouteId"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.delivery.estimatedTravelTime')}
                id="delivery-estimatedTravelTime"
                name="estimatedTravelTime"
                data-cy="estimatedTravelTime"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.delivery.deliveryTruckId')}
                id="delivery-deliveryTruckId"
                name="deliveryTruckId"
                data-cy="deliveryTruckId"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.delivery.receiverId')}
                id="delivery-receiverId"
                name="receiverId"
                data-cy="receiverId"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.delivery.orderTruckingNumber')}
                id="delivery-orderTruckingNumber"
                name="orderTruckingNumber"
                data-cy="orderTruckingNumber"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/delivery" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default DeliveryUpdate;

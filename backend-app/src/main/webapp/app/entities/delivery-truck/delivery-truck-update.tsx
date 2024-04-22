import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDeliveryTruck } from 'app/shared/model/delivery-truck.model';
import { getEntity, updateEntity, createEntity, reset } from './delivery-truck.reducer';

export const DeliveryTruckUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const deliveryTruckEntity = useAppSelector(state => state.deliveryTruck.entity);
  const loading = useAppSelector(state => state.deliveryTruck.loading);
  const updating = useAppSelector(state => state.deliveryTruck.updating);
  const updateSuccess = useAppSelector(state => state.deliveryTruck.updateSuccess);

  const handleClose = () => {
    navigate('/delivery-truck');
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
    if (values.deliveryTruckId !== undefined && typeof values.deliveryTruckId !== 'number') {
      values.deliveryTruckId = Number(values.deliveryTruckId);
    }
    if (values.capacityKg !== undefined && typeof values.capacityKg !== 'number') {
      values.capacityKg = Number(values.capacityKg);
    }
    if (values.currentLocation !== undefined && typeof values.currentLocation !== 'number') {
      values.currentLocation = Number(values.currentLocation);
    }

    const entity = {
      ...deliveryTruckEntity,
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
      ? {}
      : {
          ...deliveryTruckEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="fastxApp.deliveryTruck.home.createOrEditLabel" data-cy="DeliveryTruckCreateUpdateHeading">
            <Translate contentKey="fastxApp.deliveryTruck.home.createOrEditLabel">Create or edit a DeliveryTruck</Translate>
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
                  id="delivery-truck-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('fastxApp.deliveryTruck.deliveryTruckId')}
                id="delivery-truck-deliveryTruckId"
                name="deliveryTruckId"
                data-cy="deliveryTruckId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('fastxApp.deliveryTruck.capacityKg')}
                id="delivery-truck-capacityKg"
                name="capacityKg"
                data-cy="capacityKg"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.deliveryTruck.currentLocation')}
                id="delivery-truck-currentLocation"
                name="currentLocation"
                data-cy="currentLocation"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.deliveryTruck.status')}
                id="delivery-truck-status"
                name="status"
                data-cy="status"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.deliveryTruck.driverName')}
                id="delivery-truck-driverName"
                name="driverName"
                data-cy="driverName"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.deliveryTruck.driverContact')}
                id="delivery-truck-driverContact"
                name="driverContact"
                data-cy="driverContact"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.deliveryTruck.licensePlate')}
                id="delivery-truck-licensePlate"
                name="licensePlate"
                data-cy="licensePlate"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/delivery-truck" replace color="info">
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

export default DeliveryTruckUpdate;

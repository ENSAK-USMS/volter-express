import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDeliveryRoute } from 'app/shared/model/delivery-route.model';
import { getEntity, updateEntity, createEntity, reset } from './delivery-route.reducer';

export const DeliveryRouteUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const deliveryRouteEntity = useAppSelector(state => state.deliveryRoute.entity);
  const loading = useAppSelector(state => state.deliveryRoute.loading);
  const updating = useAppSelector(state => state.deliveryRoute.updating);
  const updateSuccess = useAppSelector(state => state.deliveryRoute.updateSuccess);

  const handleClose = () => {
    navigate('/delivery-route' + location.search);
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
    if (values.deliveryRouteId !== undefined && typeof values.deliveryRouteId !== 'number') {
      values.deliveryRouteId = Number(values.deliveryRouteId);
    }
    if (values.estimatedTravelTime !== undefined && typeof values.estimatedTravelTime !== 'number') {
      values.estimatedTravelTime = Number(values.estimatedTravelTime);
    }

    const entity = {
      ...deliveryRouteEntity,
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
          ...deliveryRouteEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="fastxApp.deliveryRoute.home.createOrEditLabel" data-cy="DeliveryRouteCreateUpdateHeading">
            <Translate contentKey="fastxApp.deliveryRoute.home.createOrEditLabel">Create or edit a DeliveryRoute</Translate>
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
                  id="delivery-route-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('fastxApp.deliveryRoute.deliveryRouteId')}
                id="delivery-route-deliveryRouteId"
                name="deliveryRouteId"
                data-cy="deliveryRouteId"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.deliveryRoute.estimatedTravelTime')}
                id="delivery-route-estimatedTravelTime"
                name="estimatedTravelTime"
                data-cy="estimatedTravelTime"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.deliveryRoute.specialInstructions')}
                id="delivery-route-specialInstructions"
                name="specialInstructions"
                data-cy="specialInstructions"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/delivery-route" replace color="info">
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

export default DeliveryRouteUpdate;

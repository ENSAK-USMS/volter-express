import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IOrder } from 'app/shared/model/order.model';
import { getEntity, updateEntity, createEntity, reset } from './order.reducer';

export const OrderUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const orderEntity = useAppSelector(state => state.order.entity);
  const loading = useAppSelector(state => state.order.loading);
  const updating = useAppSelector(state => state.order.updating);
  const updateSuccess = useAppSelector(state => state.order.updateSuccess);

  const handleClose = () => {
    navigate('/order' + location.search);
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
    if (values.orderId !== undefined && typeof values.orderId !== 'number') {
      values.orderId = Number(values.orderId);
    }
    values.orderDate = convertDateTimeToServer(values.orderDate);
    if (values.totalAmount !== undefined && typeof values.totalAmount !== 'number') {
      values.totalAmount = Number(values.totalAmount);
    }
    if (values.weightKg !== undefined && typeof values.weightKg !== 'number') {
      values.weightKg = Number(values.weightKg);
    }
    values.expirationDate = convertDateTimeToServer(values.expirationDate);
    if (values.deliveryId !== undefined && typeof values.deliveryId !== 'number') {
      values.deliveryId = Number(values.deliveryId);
    }

    const entity = {
      ...orderEntity,
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
          orderDate: displayDefaultDateTime(),
          expirationDate: displayDefaultDateTime(),
        }
      : {
          ...orderEntity,
          orderDate: convertDateTimeFromServer(orderEntity.orderDate),
          expirationDate: convertDateTimeFromServer(orderEntity.expirationDate),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="fastxApp.order.home.createOrEditLabel" data-cy="OrderCreateUpdateHeading">
            <Translate contentKey="fastxApp.order.home.createOrEditLabel">Create or edit a Order</Translate>
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
                  id="order-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('fastxApp.order.orderId')} id="order-orderId" name="orderId" data-cy="orderId" type="text" />
              <ValidatedField
                label={translate('fastxApp.order.orderDate')}
                id="order-orderDate"
                name="orderDate"
                data-cy="orderDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('fastxApp.order.totalAmount')}
                id="order-totalAmount"
                name="totalAmount"
                data-cy="totalAmount"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.order.weightKg')}
                id="order-weightKg"
                name="weightKg"
                data-cy="weightKg"
                type="text"
              />
              <ValidatedField label={translate('fastxApp.order.status')} id="order-status" name="status" data-cy="status" type="text" />
              <ValidatedField
                label={translate('fastxApp.order.expirationDate')}
                id="order-expirationDate"
                name="expirationDate"
                data-cy="expirationDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('fastxApp.order.deliveryId')}
                id="order-deliveryId"
                name="deliveryId"
                data-cy="deliveryId"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/order" replace color="info">
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

export default OrderUpdate;

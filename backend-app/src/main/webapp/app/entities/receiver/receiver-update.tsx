import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IReceiver } from 'app/shared/model/receiver.model';
import { getEntity, updateEntity, createEntity, reset } from './receiver.reducer';

export const ReceiverUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const receiverEntity = useAppSelector(state => state.receiver.entity);
  const loading = useAppSelector(state => state.receiver.loading);
  const updating = useAppSelector(state => state.receiver.updating);
  const updateSuccess = useAppSelector(state => state.receiver.updateSuccess);

  const handleClose = () => {
    navigate('/receiver');
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
    if (values.location !== undefined && typeof values.location !== 'number') {
      values.location = Number(values.location);
    }

    const entity = {
      ...receiverEntity,
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
          ...receiverEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="fastxApp.receiver.home.createOrEditLabel" data-cy="ReceiverCreateUpdateHeading">
            <Translate contentKey="fastxApp.receiver.home.createOrEditLabel">Create or edit a Receiver</Translate>
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
                  id="receiver-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('fastxApp.receiver.name')} id="receiver-name" name="name" data-cy="name" type="text" />
              <ValidatedField
                label={translate('fastxApp.receiver.country')}
                id="receiver-country"
                name="country"
                data-cy="country"
                type="text"
              />
              <ValidatedField label={translate('fastxApp.receiver.city')} id="receiver-city" name="city" data-cy="city" type="text" />
              <ValidatedField label={translate('fastxApp.receiver.email')} id="receiver-email" name="email" data-cy="email" type="text" />
              <ValidatedField label={translate('fastxApp.receiver.phone')} id="receiver-phone" name="phone" data-cy="phone" type="text" />
              <ValidatedField
                label={translate('fastxApp.receiver.streetName')}
                id="receiver-streetName"
                name="streetName"
                data-cy="streetName"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.receiver.location')}
                id="receiver-location"
                name="location"
                data-cy="location"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/receiver" replace color="info">
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

export default ReceiverUpdate;

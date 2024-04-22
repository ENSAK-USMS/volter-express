import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProfile } from 'app/shared/model/profile.model';
import { ProfileType } from 'app/shared/model/enumerations/profile-type.model';
import { getEntity, updateEntity, createEntity, reset } from './profile.reducer';

export const ProfileUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const profileEntity = useAppSelector(state => state.profile.entity);
  const loading = useAppSelector(state => state.profile.loading);
  const updating = useAppSelector(state => state.profile.updating);
  const updateSuccess = useAppSelector(state => state.profile.updateSuccess);
  const profileTypeValues = Object.keys(ProfileType);

  const handleClose = () => {
    navigate('/profile');
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
    if (values.locationLat !== undefined && typeof values.locationLat !== 'number') {
      values.locationLat = Number(values.locationLat);
    }
    if (values.locationLon !== undefined && typeof values.locationLon !== 'number') {
      values.locationLon = Number(values.locationLon);
    }

    const entity = {
      ...profileEntity,
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
          profileType: 'COMPANY',
          ...profileEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="fastxApp.profile.home.createOrEditLabel" data-cy="ProfileCreateUpdateHeading">
            <Translate contentKey="fastxApp.profile.home.createOrEditLabel">Create or edit a Profile</Translate>
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
                  id="profile-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('fastxApp.profile.phone')} id="profile-phone" name="phone" data-cy="phone" type="text" />
              <ValidatedField
                label={translate('fastxApp.profile.companyName')}
                id="profile-companyName"
                name="companyName"
                data-cy="companyName"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.profile.companyAddress')}
                id="profile-companyAddress"
                name="companyAddress"
                data-cy="companyAddress"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.profile.companyCity')}
                id="profile-companyCity"
                name="companyCity"
                data-cy="companyCity"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.profile.companyPostalCode')}
                id="profile-companyPostalCode"
                name="companyPostalCode"
                data-cy="companyPostalCode"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.profile.companyCountry')}
                id="profile-companyCountry"
                name="companyCountry"
                data-cy="companyCountry"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.profile.country')}
                id="profile-country"
                name="country"
                data-cy="country"
                type="text"
              />
              <ValidatedField label={translate('fastxApp.profile.city')} id="profile-city" name="city" data-cy="city" type="text" />
              <ValidatedField
                label={translate('fastxApp.profile.streetName')}
                id="profile-streetName"
                name="streetName"
                data-cy="streetName"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.profile.locationLat')}
                id="profile-locationLat"
                name="locationLat"
                data-cy="locationLat"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.profile.locationLon')}
                id="profile-locationLon"
                name="locationLon"
                data-cy="locationLon"
                type="text"
              />
              <ValidatedField
                label={translate('fastxApp.profile.profileType')}
                id="profile-profileType"
                name="profileType"
                data-cy="profileType"
                type="select"
              >
                {profileTypeValues.map(profileType => (
                  <option value={profileType} key={profileType}>
                    {translate('fastxApp.ProfileType.' + profileType)}
                  </option>
                ))}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/profile" replace color="info">
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

export default ProfileUpdate;

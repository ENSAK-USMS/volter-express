import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './profile.reducer';

export const ProfileDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const profileEntity = useAppSelector(state => state.profile.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="profileDetailsHeading">
          <Translate contentKey="fastxApp.profile.detail.title">Profile</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{profileEntity.id}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="fastxApp.profile.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{profileEntity.phone}</dd>
          <dt>
            <span id="companyName">
              <Translate contentKey="fastxApp.profile.companyName">Company Name</Translate>
            </span>
          </dt>
          <dd>{profileEntity.companyName}</dd>
          <dt>
            <span id="companyAddress">
              <Translate contentKey="fastxApp.profile.companyAddress">Company Address</Translate>
            </span>
          </dt>
          <dd>{profileEntity.companyAddress}</dd>
          <dt>
            <span id="companyCity">
              <Translate contentKey="fastxApp.profile.companyCity">Company City</Translate>
            </span>
          </dt>
          <dd>{profileEntity.companyCity}</dd>
          <dt>
            <span id="companyPostalCode">
              <Translate contentKey="fastxApp.profile.companyPostalCode">Company Postal Code</Translate>
            </span>
          </dt>
          <dd>{profileEntity.companyPostalCode}</dd>
          <dt>
            <span id="companyCountry">
              <Translate contentKey="fastxApp.profile.companyCountry">Company Country</Translate>
            </span>
          </dt>
          <dd>{profileEntity.companyCountry}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="fastxApp.profile.country">Country</Translate>
            </span>
          </dt>
          <dd>{profileEntity.country}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="fastxApp.profile.city">City</Translate>
            </span>
          </dt>
          <dd>{profileEntity.city}</dd>
          <dt>
            <span id="streetName">
              <Translate contentKey="fastxApp.profile.streetName">Street Name</Translate>
            </span>
          </dt>
          <dd>{profileEntity.streetName}</dd>
          <dt>
            <span id="locationLat">
              <Translate contentKey="fastxApp.profile.locationLat">Location Lat</Translate>
            </span>
          </dt>
          <dd>{profileEntity.locationLat}</dd>
          <dt>
            <span id="locationLon">
              <Translate contentKey="fastxApp.profile.locationLon">Location Lon</Translate>
            </span>
          </dt>
          <dd>{profileEntity.locationLon}</dd>
          <dt>
            <span id="profileType">
              <Translate contentKey="fastxApp.profile.profileType">Profile Type</Translate>
            </span>
          </dt>
          <dd>{profileEntity.profileType}</dd>
        </dl>
        <Button tag={Link} to="/profile" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/profile/${profileEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProfileDetail;

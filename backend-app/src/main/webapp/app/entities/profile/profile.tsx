import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './profile.reducer';

export const Profile = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const profileList = useAppSelector(state => state.profile.entities);
  const loading = useAppSelector(state => state.profile.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="profile-heading" data-cy="ProfileHeading">
        <Translate contentKey="fastxApp.profile.home.title">Profiles</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="fastxApp.profile.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/profile/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="fastxApp.profile.home.createLabel">Create new Profile</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {profileList && profileList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="fastxApp.profile.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('phone')}>
                  <Translate contentKey="fastxApp.profile.phone">Phone</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('phone')} />
                </th>
                <th className="hand" onClick={sort('companyName')}>
                  <Translate contentKey="fastxApp.profile.companyName">Company Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('companyName')} />
                </th>
                <th className="hand" onClick={sort('companyAddress')}>
                  <Translate contentKey="fastxApp.profile.companyAddress">Company Address</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('companyAddress')} />
                </th>
                <th className="hand" onClick={sort('companyCity')}>
                  <Translate contentKey="fastxApp.profile.companyCity">Company City</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('companyCity')} />
                </th>
                <th className="hand" onClick={sort('companyPostalCode')}>
                  <Translate contentKey="fastxApp.profile.companyPostalCode">Company Postal Code</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('companyPostalCode')} />
                </th>
                <th className="hand" onClick={sort('companyCountry')}>
                  <Translate contentKey="fastxApp.profile.companyCountry">Company Country</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('companyCountry')} />
                </th>
                <th className="hand" onClick={sort('country')}>
                  <Translate contentKey="fastxApp.profile.country">Country</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('country')} />
                </th>
                <th className="hand" onClick={sort('city')}>
                  <Translate contentKey="fastxApp.profile.city">City</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('city')} />
                </th>
                <th className="hand" onClick={sort('streetName')}>
                  <Translate contentKey="fastxApp.profile.streetName">Street Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('streetName')} />
                </th>
                <th className="hand" onClick={sort('locationLat')}>
                  <Translate contentKey="fastxApp.profile.locationLat">Location Lat</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('locationLat')} />
                </th>
                <th className="hand" onClick={sort('locationLon')}>
                  <Translate contentKey="fastxApp.profile.locationLon">Location Lon</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('locationLon')} />
                </th>
                <th className="hand" onClick={sort('profileType')}>
                  <Translate contentKey="fastxApp.profile.profileType">Profile Type</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('profileType')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {profileList.map((profile, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/profile/${profile.id}`} color="link" size="sm">
                      {profile.id}
                    </Button>
                  </td>
                  <td>{profile.phone}</td>
                  <td>{profile.companyName}</td>
                  <td>{profile.companyAddress}</td>
                  <td>{profile.companyCity}</td>
                  <td>{profile.companyPostalCode}</td>
                  <td>{profile.companyCountry}</td>
                  <td>{profile.country}</td>
                  <td>{profile.city}</td>
                  <td>{profile.streetName}</td>
                  <td>{profile.locationLat}</td>
                  <td>{profile.locationLon}</td>
                  <td>
                    <Translate contentKey={`fastxApp.ProfileType.${profile.profileType}`} />
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/profile/${profile.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/profile/${profile.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/profile/${profile.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="fastxApp.profile.home.notFound">No Profiles found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Profile;

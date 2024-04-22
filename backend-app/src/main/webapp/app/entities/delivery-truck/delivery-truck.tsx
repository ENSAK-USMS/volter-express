import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './delivery-truck.reducer';

export const DeliveryTruck = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const deliveryTruckList = useAppSelector(state => state.deliveryTruck.entities);
  const loading = useAppSelector(state => state.deliveryTruck.loading);

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
      <h2 id="delivery-truck-heading" data-cy="DeliveryTruckHeading">
        <Translate contentKey="fastxApp.deliveryTruck.home.title">Delivery Trucks</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="fastxApp.deliveryTruck.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/delivery-truck/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="fastxApp.deliveryTruck.home.createLabel">Create new Delivery Truck</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {deliveryTruckList && deliveryTruckList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="fastxApp.deliveryTruck.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('deliveryTruckId')}>
                  <Translate contentKey="fastxApp.deliveryTruck.deliveryTruckId">Delivery Truck Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('deliveryTruckId')} />
                </th>
                <th className="hand" onClick={sort('capacityKg')}>
                  <Translate contentKey="fastxApp.deliveryTruck.capacityKg">Capacity Kg</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('capacityKg')} />
                </th>
                <th className="hand" onClick={sort('currentLocation')}>
                  <Translate contentKey="fastxApp.deliveryTruck.currentLocation">Current Location</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('currentLocation')} />
                </th>
                <th className="hand" onClick={sort('status')}>
                  <Translate contentKey="fastxApp.deliveryTruck.status">Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('status')} />
                </th>
                <th className="hand" onClick={sort('driverName')}>
                  <Translate contentKey="fastxApp.deliveryTruck.driverName">Driver Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('driverName')} />
                </th>
                <th className="hand" onClick={sort('driverContact')}>
                  <Translate contentKey="fastxApp.deliveryTruck.driverContact">Driver Contact</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('driverContact')} />
                </th>
                <th className="hand" onClick={sort('licensePlate')}>
                  <Translate contentKey="fastxApp.deliveryTruck.licensePlate">License Plate</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('licensePlate')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {deliveryTruckList.map((deliveryTruck, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/delivery-truck/${deliveryTruck.id}`} color="link" size="sm">
                      {deliveryTruck.id}
                    </Button>
                  </td>
                  <td>{deliveryTruck.deliveryTruckId}</td>
                  <td>{deliveryTruck.capacityKg}</td>
                  <td>{deliveryTruck.currentLocation}</td>
                  <td>{deliveryTruck.status}</td>
                  <td>{deliveryTruck.driverName}</td>
                  <td>{deliveryTruck.driverContact}</td>
                  <td>{deliveryTruck.licensePlate}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/delivery-truck/${deliveryTruck.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/delivery-truck/${deliveryTruck.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/delivery-truck/${deliveryTruck.id}/delete`)}
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
              <Translate contentKey="fastxApp.deliveryTruck.home.notFound">No Delivery Trucks found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DeliveryTruck;

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './receiver.reducer';

export const Receiver = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const receiverList = useAppSelector(state => state.receiver.entities);
  const loading = useAppSelector(state => state.receiver.loading);

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
      <h2 id="receiver-heading" data-cy="ReceiverHeading">
        <Translate contentKey="fastxApp.receiver.home.title">Receivers</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="fastxApp.receiver.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/receiver/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="fastxApp.receiver.home.createLabel">Create new Receiver</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {receiverList && receiverList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="fastxApp.receiver.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="fastxApp.receiver.name">Name</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                <th className="hand" onClick={sort('country')}>
                  <Translate contentKey="fastxApp.receiver.country">Country</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('country')} />
                </th>
                <th className="hand" onClick={sort('city')}>
                  <Translate contentKey="fastxApp.receiver.city">City</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('city')} />
                </th>
                <th className="hand" onClick={sort('email')}>
                  <Translate contentKey="fastxApp.receiver.email">Email</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('email')} />
                </th>
                <th className="hand" onClick={sort('phone')}>
                  <Translate contentKey="fastxApp.receiver.phone">Phone</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('phone')} />
                </th>
                <th className="hand" onClick={sort('streetName')}>
                  <Translate contentKey="fastxApp.receiver.streetName">Street Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('streetName')} />
                </th>
                <th className="hand" onClick={sort('location')}>
                  <Translate contentKey="fastxApp.receiver.location">Location</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('location')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {receiverList.map((receiver, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/receiver/${receiver.id}`} color="link" size="sm">
                      {receiver.id}
                    </Button>
                  </td>
                  <td>{receiver.name}</td>
                  <td>{receiver.country}</td>
                  <td>{receiver.city}</td>
                  <td>{receiver.email}</td>
                  <td>{receiver.phone}</td>
                  <td>{receiver.streetName}</td>
                  <td>{receiver.location}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/receiver/${receiver.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/receiver/${receiver.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/receiver/${receiver.id}/delete`)}
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
              <Translate contentKey="fastxApp.receiver.home.notFound">No Receivers found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Receiver;

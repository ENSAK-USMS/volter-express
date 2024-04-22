import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import DeliveryTruck from './delivery-truck';
import DeliveryTruckDetail from './delivery-truck-detail';
import DeliveryTruckUpdate from './delivery-truck-update';
import DeliveryTruckDeleteDialog from './delivery-truck-delete-dialog';

const DeliveryTruckRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<DeliveryTruck />} />
    <Route path="new" element={<DeliveryTruckUpdate />} />
    <Route path=":id">
      <Route index element={<DeliveryTruckDetail />} />
      <Route path="edit" element={<DeliveryTruckUpdate />} />
      <Route path="delete" element={<DeliveryTruckDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DeliveryTruckRoutes;

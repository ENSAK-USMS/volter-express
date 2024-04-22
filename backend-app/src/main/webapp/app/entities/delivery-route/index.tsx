import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import DeliveryRoute from './delivery-route';
import DeliveryRouteDetail from './delivery-route-detail';
import DeliveryRouteUpdate from './delivery-route-update';
import DeliveryRouteDeleteDialog from './delivery-route-delete-dialog';

const DeliveryRouteRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<DeliveryRoute />} />
    <Route path="new" element={<DeliveryRouteUpdate />} />
    <Route path=":id">
      <Route index element={<DeliveryRouteDetail />} />
      <Route path="edit" element={<DeliveryRouteUpdate />} />
      <Route path="delete" element={<DeliveryRouteDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DeliveryRouteRoutes;

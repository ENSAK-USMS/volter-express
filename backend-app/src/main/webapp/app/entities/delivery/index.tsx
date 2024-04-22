import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Delivery from './delivery';
import DeliveryDetail from './delivery-detail';
import DeliveryUpdate from './delivery-update';
import DeliveryDeleteDialog from './delivery-delete-dialog';

const DeliveryRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Delivery />} />
    <Route path="new" element={<DeliveryUpdate />} />
    <Route path=":id">
      <Route index element={<DeliveryDetail />} />
      <Route path="edit" element={<DeliveryUpdate />} />
      <Route path="delete" element={<DeliveryDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DeliveryRoutes;

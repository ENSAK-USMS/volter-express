import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Receiver from './receiver';
import ReceiverDetail from './receiver-detail';
import ReceiverUpdate from './receiver-update';
import ReceiverDeleteDialog from './receiver-delete-dialog';

const ReceiverRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Receiver />} />
    <Route path="new" element={<ReceiverUpdate />} />
    <Route path=":id">
      <Route index element={<ReceiverDetail />} />
      <Route path="edit" element={<ReceiverUpdate />} />
      <Route path="delete" element={<ReceiverDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ReceiverRoutes;

import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Delivery from './delivery';
import Order from './order';
import Receiver from './receiver';
import DeliveryRoute from './delivery-route';
import DeliveryTruck from './delivery-truck';
import Profile from './profile';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="delivery/*" element={<Delivery />} />
        <Route path="order/*" element={<Order />} />
        <Route path="receiver/*" element={<Receiver />} />
        <Route path="delivery-route/*" element={<DeliveryRoute />} />
        <Route path="delivery-truck/*" element={<DeliveryTruck />} />
        <Route path="profile/*" element={<Profile />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};

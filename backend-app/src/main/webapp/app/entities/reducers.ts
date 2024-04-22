import delivery from 'app/entities/delivery/delivery.reducer';
import order from 'app/entities/order/order.reducer';
import receiver from 'app/entities/receiver/receiver.reducer';
import deliveryRoute from 'app/entities/delivery-route/delivery-route.reducer';
import deliveryTruck from 'app/entities/delivery-truck/delivery-truck.reducer';
import profile from 'app/entities/profile/profile.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  delivery,
  order,
  receiver,
  deliveryRoute,
  deliveryTruck,
  profile,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;

import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/delivery">
        <Translate contentKey="global.menu.entities.delivery" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/order">
        <Translate contentKey="global.menu.entities.order" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/receiver">
        <Translate contentKey="global.menu.entities.receiver" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/delivery-route">
        <Translate contentKey="global.menu.entities.deliveryRoute" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/delivery-truck">
        <Translate contentKey="global.menu.entities.deliveryTruck" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/profile">
        <Translate contentKey="global.menu.entities.profile" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;

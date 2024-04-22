export interface IDeliveryRoute {
  id?: string;
  deliveryRouteId?: number | null;
  estimatedTravelTime?: number | null;
  specialInstructions?: string | null;
}

export const defaultValue: Readonly<IDeliveryRoute> = {};

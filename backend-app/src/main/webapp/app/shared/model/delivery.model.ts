import dayjs from 'dayjs';

export interface IDelivery {
  id?: string;
  deliveryDate?: dayjs.Dayjs | null;
  orderId?: number | null;
  deliveryAddressId?: number | null;
  deliveryRouteId?: number | null;
  estimatedTravelTime?: number | null;
  deliveryTruckId?: number | null;
  receiverId?: number | null;
  orderTruckingNumber?: number | null;
}

export const defaultValue: Readonly<IDelivery> = {};

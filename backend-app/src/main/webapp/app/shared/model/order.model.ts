import dayjs from 'dayjs';

export interface IOrder {
  id?: string;
  orderId?: number | null;
  orderDate?: dayjs.Dayjs | null;
  totalAmount?: number | null;
  weightKg?: number | null;
  status?: string | null;
  expirationDate?: dayjs.Dayjs | null;
  deliveryId?: number | null;
}

export const defaultValue: Readonly<IOrder> = {};

export interface IDeliveryTruck {
  id?: string;
  deliveryTruckId?: number;
  capacityKg?: number | null;
  currentLocation?: number | null;
  status?: string | null;
  driverName?: string | null;
  driverContact?: string | null;
  licensePlate?: string | null;
}

export const defaultValue: Readonly<IDeliveryTruck> = {};

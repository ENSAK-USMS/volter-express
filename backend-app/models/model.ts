

// DeliveryAddress model
export interface DeliveryAddress {
    deliveryAddressId: number;
    city: string;
    postalCode: string;
    country: string;
}

// DeliveryRoute model
export interface DeliveryRoute {
    deliveryRouteId: number;
    waypoints: string;
    estimatedTravelTime: number;
    specialInstructions: string;
}

// DeliveryTruck model
export interface DeliveryTruck {
    deliveryTruckId: number;
    capacityKg: number;
    currentLocation: string;
    status: string;
    driverName: string;
    driverContact: string;
    licensePlate: string;
}

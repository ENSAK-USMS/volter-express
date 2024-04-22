import mongoose, { Schema, model } from 'mongoose';

export interface DeliveryRoute extends mongoose.Document {
    deliveryRouteId: number;
    waysPoint : Number[];
    estimatedTravelTime : number;
    specialInstructions: string;
}

const DeliveryRouteSchema: Schema = new mongoose.Schema<DeliveryRoute>({
    deliveryRouteId: { type: Number, required: true },
    waysPoint: { type: [Number]},
    specialInstructions: { type: String, required: true },
});

const DeliveryRoute = model<DeliveryRoute>('DeliveryRoute', DeliveryRouteSchema);

export default DeliveryRoute;

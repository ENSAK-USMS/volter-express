import mongoose, { Schema, model } from 'mongoose';

export interface DeliveryTruck extends mongoose.Document {
    deliveryTruckId: number;
    CapacityKg : Number;
    CurrentLLocation : [Number,Number]
    status: string;
    driverName: string;
    driverContact: string;
    licensePlate: string;
}

const DeliveryTruckSchema: Schema = new mongoose.Schema<DeliveryTruck>({
    deliveryTruckId: { type: Number, required: true },
    CapacityKg: { type: Number },
    CurrentLLocation: { type: [Number, Number] },
    status: { type: String },
    driverName: { type: String },
    driverContact: { type: String },
    licensePlate: { type: String },
});

const DeliveryTruck = model<DeliveryTruck>('DeliveryTruck', DeliveryTruckSchema);

export default DeliveryTruck;

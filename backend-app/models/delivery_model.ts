import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose';

export interface IDelivery extends Document {
    _id: ObjectId;
    deliveryDate: Date;
    orderId: number;
    deliveryAddressId: number;
    deliveryRouteId: number;
    estimatedTravelTime: Number;
    deliveryTruckId: number;
    receiverId: number;
    orderTruckingNumber: number;
}


const deliverySchema: Schema = new mongoose.Schema<IDelivery>(
    {
        deliveryDate: {
            type: Date,
            required: [true, 'Please fill in the delivery date'],
        },
        orderId: {
            type: Number,
            required: [true, 'Please fill in the order id'],
        },
        deliveryAddressId: {
            type: Number,
            required: [true, 'Please fill in the delivery address id'],
        },
        deliveryRouteId: {
            type: Number,
            required: [true, 'Please fill in the delivery route id'],
        },
        estimatedTravelTime: {
            type: Number,
            required: [true, 'Please fill in the estimated travel time'],
        },
        deliveryTruckId: {
            type: Number,
            required: [true, 'Please fill in the delivery truck id'],
        },
        receiverId: {
            type: Number,
            required: [true, 'Please fill in the receiver id'],
        },
        orderTruckingNumber: {
            type: Number,
            required: [true, 'Please fill in the order trucking number'],
        },
    },
    {
        timestamps: true,
    }
);

const Delivery: Model<IDelivery> = mongoose.model<IDelivery>('Delivery', deliverySchema);

export default Delivery;
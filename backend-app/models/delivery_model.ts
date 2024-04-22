import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose';

export interface IDelivery extends Document {
    _id: ObjectId;
    deliveryDate: Date;
    orderId: number;
    deliveryAddressId: number;
    deliveryRouteId: number;
    deliveryTruckId: number;
    receiverId: number;
    status: string;
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
        deliveryTruckId: {
            type: Number,
            required: [true, 'Please fill in the delivery truck id'],
        },
        status: {
            type: String,
            required: [true, 'Please fill in the delivery status'],
        },
    },
    {
        timestamps: true,
    }
);

const Delivery: Model<IDelivery> = mongoose.model<IDelivery>('Delivery', deliverySchema);

export default Delivery;
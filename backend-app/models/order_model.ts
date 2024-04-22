import mongoose, { Schema, model } from 'mongoose';

export interface IOrder extends mongoose.Document {
    orderId: number;
    orderDate: Date;
    totalAmount: number;
    weightKg: number;
    status: string;
    expirationDate: Date;
    deliveryId: number;
}

const orderSchema: Schema = new mongoose.Schema<IOrder>({
    orderId: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    weightKg: { type: Number, required: true },
    status: {
        type: String,
        default: 'At Warehouse',
        enum: ['At Warehouse', 'On Route', 'Delivered'],
        required: true,
    },

    deliveryId: { type: Number },
    expirationDate: { type: Date, required: true },

});

const OrderModel = model<IOrder>('Order', orderSchema);

export default OrderModel;

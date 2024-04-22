import mongoose, { Model, Schema } from 'mongoose';
import validator from 'validator';



export interface IReceiver extends mongoose.Document {
    name: string;
    country: string;
    city: string;
    email: string;
    phone: string;
    streetName: string;
    location: {
        coordinates: number[];
    };
}




const receiverSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please fill in the receiver name'],
        },
        country: {
            type: String,
            required: [true, 'Please fill in the country'],
        },
        city: {
            type: String,
            required: [true, 'Please fill in the city'],
        },
        email: {
            type: String,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email'],
        },
        phone: {
            type: String,
            required: [true, 'Please fill in the phone number'],
            validate: {
                validator: function (v: string) {
                    return validator.isMobilePhone(v, 'any', { strictMode: true });
                },
                message: 'Please provide a valid phone number',
            },
        },
        streetName: {
            type: String,
            required: [true, 'Please fill in the street name'],
        },
        location: {
            coordinates: {
                type: [Number],
                required: true,
            },
        },
    },
    { timestamps: true }
);

const Receiver: Model<IReceiver> = mongoose.model<IReceiver>('Receiver', receiverSchema);
export default Receiver;
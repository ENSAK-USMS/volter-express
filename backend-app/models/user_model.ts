import mongoose, { Model, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import Actions from '@constants/actions';
import metaData from '@constants/meta_data';
import { randomBytes, createHash } from 'crypto';

import { ObjectId } from 'mongoose';
import { Document } from 'mongoose';

interface IUser extends Document {
    _id: ObjectId;
    name: string;
    email: string;
    phone: string;
    companyName?: string;
    companyAddress?: string;
    companyCity?: string;
    companyPostalCode?: string;
    companyCountry?: string;
    country?: string;
    city?: string;
    streetName?: string;
    location: {
        coordinates: number[];
    };
    password?: string;
    authorities: string[];
    restrictions: string[];
    roles: string[];
    active: boolean;
    activationKey?: string;
    accessRestricted: boolean;
    githubOauthAccessToken?: string;
    resetKey?: string;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
    deletedBy?: string;
    deletedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
    correctPassword(
        typedPassword: string,
        originalPassword: string
    ): Promise<boolean>;
    isAuthorizedTo(action: string[]): boolean;
    isRestrictedFrom(action: string[]): boolean;
    generateResetKey(): string;
}



const userSchema: Schema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Please fill your name'],
        },
        email: {
            type: String,
            required: [true, 'Please fill your email'],
            lowercase: true,
            validate: [validator.isEmail, ' Please provide a valid email'],
        },
        phone: {
            type: String,
            required: [true, 'Please fill your phone number'],
            validate: {
                validator: function (v: string) {
                    return validator.isMobilePhone(v, 'any', { strictMode: true });
                },
                message: 'Please provide a valid phone number',
            },
        },
        companyName: {
            type: String,
        },
        companyAddress: {
            type: String,
            trim: true,
        },
        companyCity: {
            type: String,
        },
        companyPostalCode: {
            type: String,
        },
        companyCountry: {
            type: String,
        },
        country: {
            type: String,
        },
        city: {
            type: String,
        },
        streetName: {
            type: String,
        },
        location: {
            coordinates: {
                type: [Number],
                default: [0, 0],
            },
        },
        password: {
            type: String,
            minLength: 6,
            select: false,
        },
        authorities: {
            type: [String],
            default: [],
            validate: {
                validator: function (el: string[]) {
                    return el.every((action) =>
                        Object.values(Actions).includes(action)
                    );
                },
            },
            message: 'Please provide a valid action',
        },
        restrictions: {
            type: [String],
            default: [],
            validate: {
                validator: function (el: string[]) {
                    return el.every((action) =>
                        Object.values(Actions).includes(action)
                    );
                },
                message: 'Please provide a valid action',
            },
        },
        roles: {
            type: [String],
            default: [],
        },
        active: {
            type: Boolean,
            default: true,
        },
        activationKey: {
            type: String,
            select: false,
        },
        accessRestricted: {
            type: Boolean,
            default: false,
        },
        githubOauthAccessToken: {
            type: String,
            select: false,
            default: null,
        },
        resetKey: {
            type: String,
            select: false,
        },
    },
    { timestamps: true }
);

// add meta data to the schema
metaData.apply(userSchema);

userSchema.pre<IUser>('save', async function (next) {
    if (
        !this.isModified('password') ||
        this.password === undefined ||
        (this.password === null && this.githubOauthAccessToken !== null)
    ) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function (
    typedPassword: string,
    originalPassword: string
) {
    const isTrue = await bcrypt.compare(typedPassword, originalPassword);
    return isTrue;
};

// verify if the user is authorized or restricted from an action
userSchema.methods.isAuthorizedTo = function (actions: string[]) {
    return actions.every((action) => this.authorities.includes(action));
};

userSchema.methods.isRestrictedFrom = function (actions: string[]) {
    return actions.some((action) => this.restrictions.includes(action));
};

// generateResetKey
userSchema.methods.generateResetKey = function () {
    const resetKey = randomBytes(32).toString('hex');
    this.resetKey = createHash('sha256').update(resetKey).digest('hex');
    return resetKey;
};

userSchema.index(
    { email: 1 },
    { unique: true, partialFilterExpression: { deleted: false } }
);

userSchema.pre('find', function () {
    this.where({ deleted: false });
});

userSchema.pre('findOne', function () {
    this.where({ deleted: false });
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;

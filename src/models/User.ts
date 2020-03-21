import * as mongoose from "mongoose";
import { Schema, Document, Model, model } from 'mongoose';

delete mongoose.connection.models['User'];

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
}

//Create Schema
const UserSchema: Schema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	cart: {
		type: mongoose.Schema.Types.ObjectId, ref: "CartSchema"
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
	// billingDetails: {
	// 	firstName: {
	// 		type: String
	// 	}
	// },
	// shippingDetails: {
	// }
});

// middleware hook
UserSchema.pre('findOneAndUpdate', function () {
	this.update({}, { $set: { updated_at: new Date() } });
});

export const User: Model<IUser> = model<IUser>('User', UserSchema);
import * as mongoose from "mongoose";
import { Schema, Document, Model, model } from 'mongoose';
import { IProduct } from "./Product";

delete mongoose.connection.models['Cart'];

export interface ICart extends Document {
	orderedBy: { type: String },
	orderedItems: IProduct,
	total: { type: Number }
}

export interface ICartItem extends Document {
	quantity: Number,
	product: String,
	orderedBy: String
}

var CartSchema = new Schema({
	orderedBy: {
		type: Schema.Types.ObjectId, ref: 'UserSchema'
	},
	orderedItems: [
		{
			quantity: {
				type: Number
			},
			product: {
				type: Schema.Types.ObjectId,
				ref: 'ProductSchema'
			},
			orderedBy: {
				type: Schema.Types.ObjectId,
				ref: 'UserSchema'
			},
		}
	],
	total: {
		type: Number, required: [true, "An order must have a total"]
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
});

// middleware hook
CartSchema.pre('findOneAndUpdate', function () {
	this.update({}, { $set: { updated_at: new Date() } });
});


export const Cart: Model<ICart> = model<ICart>('Cart', CartSchema);
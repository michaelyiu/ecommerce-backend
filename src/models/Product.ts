import * as mongoose from "mongoose";
import { Schema, Document, Model, model } from 'mongoose';

delete mongoose.connection.models['Product'];

export interface IProduct extends Document {
	category: string;
	name: string;
	price: number;
	images: [string];
	description: string;
	brand: string;
}

var ProductSchema = new Schema({
	category: String,
	name: String,
	price: Number,
	images: [String],
	description: String,
	brand: String,

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
ProductSchema.pre('findOneAndUpdate', function () {
	this.update({}, { $set: { updated_at: new Date() } });
});

export const Product: Model<IProduct> = model<IProduct>('Product', ProductSchema);
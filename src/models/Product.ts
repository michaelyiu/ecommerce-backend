import * as mongoose from "mongoose";
import { Schema, Document, Model, model } from 'mongoose';

delete mongoose.connection.models['Product'];

export interface IProduct extends Document {
	category: string;
	name: string;
	price: number;
	image: string;
}

var ProductSchema = new Schema({
	category: String,
	name: String,
	price: Number,
	image: String
});


export const Product: Model<IProduct> = model<IProduct>('Product', ProductSchema);
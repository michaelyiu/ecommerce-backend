import * as mongoose from "mongoose";
import { Schema, Document, Model, model } from 'mongoose';
import { IProduct } from "./Product";

delete mongoose.connection.models['Order'];

interface IProducts extends Array<IProduct> { }

export interface IOrder extends Document {
	user_id: { type: String },
	products: IProducts
}

var OrderSchema = new Schema({
	user_id: { type: Schema.Types.ObjectId, ref: 'UserSchema' },
	products: [{ type: Schema.Types.ObjectId, ref: 'ProductSchema' }]
});


export const Order: Model<IOrder> = model<IOrder>('Order', OrderSchema);
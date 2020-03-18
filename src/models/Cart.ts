import * as mongoose from "mongoose";
import { Schema, Document, Model, model } from 'mongoose';
// import { IProduct } from "./Product";

delete mongoose.connection.models['Cart'];

// interface IProducts extends Array<IProduct> { }

export interface ICart extends Document {
	user_id: { type: String },
	// orderedItems: IProducts,
	total: { type: Number }
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
	// orderedItems: [
	// 	{
	// 	type: Schema.Types.ObjectId, ref: 'CartItemSchema'
	// }],
	total: {
		type: Number, required: [true, "An order must have a total"]
	}
});


export const Cart: Model<ICart> = model<ICart>('Cart', CartSchema);
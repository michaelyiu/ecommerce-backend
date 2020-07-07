import { IResolvers } from 'graphql-tools';
import { combineResolvers } from "graphql-resolvers";

import { stripe } from "../connectors/stripe";
import { User } from '../models/User';

const checkoutResolvers: IResolvers = {
	Query: {
	},
	Mutation: {
		createOrder: async (_, { total_bill }: { total_bill: number }, { models, me }) => {

			const user = await models.User.findById(me.id);

			if (!user) {
				throw new Error();
			}

			console.log("Before payment intent created");
			const order = await stripe.paymentIntents.create({
				amount: total_bill * 100,
				currency: 'CAD',
				description: 'Order placement'
			});
			console.log(order.client_secret);
			return order
		}
	}
};

export default checkoutResolvers;

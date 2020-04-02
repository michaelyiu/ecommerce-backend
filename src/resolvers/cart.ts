import { IResolvers } from 'graphql-tools';
import { combineResolvers } from "graphql-resolvers";
// import { AuthenticationError, UserInputError } from "apollo-server-lambda";

const cartResolvers: IResolvers = {
	Query: {
		cart: combineResolvers(
			async (_, { id }, { models, me }): Promise<string> => {
				console.log(me)
				return models.Cart.findOne({ orderedBy: me.id })
			}
		)
	},
	Mutation: {
		updateCart: combineResolvers(
			async (_, { cartInput }, { models, me }): Promise<string> => {
				console.log('test')
				let cart;
				if (!cartInput) {
					cart = await models.Cart.create({
						orderedBy: me ? me.id : null,
						total: 0
					})
				}
				else {
					cart = await models.Cart.findOneAndUpdate(
						{ orderedBy: me.id },
						cartInput,
						{ upsert: true, new: true }
					)
				}
				return cart;
			}
		),
		deleteCart: combineResolvers(
			async (_, { cart_id }, { models }): Promise<boolean> => {
				const cart = await models.Cart.findById(cart_id)
					.then((cart: any) => {
						cart.remove()
							.then(cart)
							.catch(() => {
								throw new Error("Something went wrong with the cart");
							})
						return true;
					})
				return cart;
			}

		)
	},
	Cart: {
		user: async (cart, _, { models }) => {
			const orderedBy = await models.User.findById({ _id: cart.orderedBy });
			return orderedBy;
		},
	}


}
export default cartResolvers;

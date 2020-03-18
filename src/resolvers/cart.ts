import { IResolvers } from 'graphql-tools';
import { combineResolvers } from "graphql-resolvers";
// import { AuthenticationError, UserInputError } from "apollo-server-lambda";

const cartResolvers: IResolvers = {
	Query: {
		cart: combineResolvers(
			async (_: any, { id }: any, { models }: any): Promise<string> => {
				return models.Cart.findById(id)
			}
		)
	},
	Mutation: {
		updateCart: combineResolvers(
			async (_: any, { cartInput }: any, { models, me }: any): Promise<string> => {
				let cart;
				if (!cartInput) {
					cart = await models.Cart.create({
						user: me.id,
						total: 0
					})
				}
				else {

					console.log(cartInput)
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
			async (_: any, { cart_id }: any, { models }: any): Promise<boolean> => {
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

import { IResolvers } from 'graphql-tools';
import { combineResolvers } from "graphql-resolvers";
// import { AuthenticationError, UserInputError } from "apollo-server-lambda";

const cartResolvers: IResolvers = {
	Query: {
		cart: combineResolvers(
			async (_, _args, { models, me }): Promise<string> => {
				return models.Cart.findOne({ orderedBy: me.id })
			}
		)
	},
	Mutation: {
		updateCart: combineResolvers(
			async (_, { cartInput }, { models, me }): Promise<string> => {
				console.log("does my request reach?")
				let { orderedItems } = cartInput;
				let total: number = 0;
				for (let i = 0; i < orderedItems.length; i++) {
					total = total + (orderedItems[i].price * orderedItems[i].quantity);
					orderedItems[i].product = orderedItems[i].id;
				}

				let cart = await models.Cart.findOne({
					orderedBy: me.id
				});

				if (!cart) {
					cart = await models.Cart.create({
						orderedBy: me ? me.id : null,
						total,
						orderedItems
					})
				}
				else {
					cart.total = total
					cart.orderedItems = orderedItems
					await cart.save();
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

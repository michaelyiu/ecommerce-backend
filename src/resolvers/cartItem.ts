import { IResolvers } from 'graphql-tools';
import { combineResolvers } from "graphql-resolvers";
// import { AuthenticationError, UserInputError } from "apollo-server-lambda";

const cartItemResolvers: IResolvers = {
	Query: {
		cartItem: combineResolvers(
			async (_: any, args: any, { models }: any): Promise<string> => {
				return models.CartItem.findById(args.id)
			}
		),
		allCartItems: combineResolvers(
			async (_: any, args: any, { models }: any): Promise<string> => {
				const cartItems = await models.CartItem.find();

				return cartItems.map((cartItem: any) => {
					cartItem.id = cartItem.id.toString();
					return cartItem;
				})

			}
		)
	},
	Mutation: {
		createCartItem: combineResolvers(
			async (_: any, { cartItemInput }: any, { models, me }: any): Promise<string> => {
				//need to check if product id is valid
				await models.Product.findById(cartItemInput.product).catch(() => {
					throw new Error("Product not found")
				})

				const cart = await models.Cart.findById(cartItemInput.cart_id).then((cart: any) => {
					cart.save();
					cartItemInput.orderedBy = me.id
					cart.orderedItems.unshift(cartItemInput)
					return cart.orderedItems[0];
				})
					.catch(() => {
						throw new Error("Cart not found")
					})
				return cart;
			}
		),
		updateCartItem: combineResolvers(
			async (_: any, args: any, { models }: any): Promise<string> => {

				const cart = await models.Cart.findOneAndUpdate({
					"_id": args.cartItemInput.cart_id,
					"orderedItems._id": args.cartItem_id
				}, {
					"$set": {
						"orderedItems.$.product": args.cartItemInput.product,
						"orderedItems.$.quantity": args.cartItemInput.quantity,
					},
				},
					{ "new": true, "upsert": true }
				).then((cart: any) => {
					return cart.orderedItems.id(args.cartItem_id)
				})
				return cart;
			}
		),
		deleteCartItem: combineResolvers(
			async (_: any, args: any, { models }: any): Promise<boolean> => {
				const cart = await models.Cart.findById(args.cart_id)
					.then((cart: any) => {
						if (
							cart.orderedItems.filter(
								(item: any) => item._id.toString() === args.cartItem_id).length === 0
						) {
							return new Error("Cart item does not exist");
						}
						const removeIndex = cart.orderedItems.map(
							(item: any) => item._id.toString())
							.indexOf(args.cartItem_id);

						cart.orderedItems.splice(removeIndex, 1);
						cart.save().then(cart);
						return true;
					})
				//already gone
				return cart
			}
		),
	},
	CartItem: {
		product: async (cartItem, _, { models }) => {
			const product = await models.Product.findById({ _id: cartItem.product });
			return product;
		},
		orderedBy: async (cartItem, _, { models }) => {
			const orderedBy = await models.User.findById({ _id: cartItem.orderedBy });
			return orderedBy;
		},
	}
}
export default cartItemResolvers;

import { gql } from "apollo-server-lambda";

export default gql`
	extend type Query {
		cartItem(id: String!): CartItem
		allCartItems: [CartItem]
	}

	extend type Mutation {
		createCartItem( cartItemInput: CartItemInput): CartItem
		updateCartItem(cartItem_id: String! cartItemInput: CartItemInput): CartItem
		deleteCartItem(cartItem_id: String! cart_id: String!): Boolean
	}

	input CartItemInput {
		cart_id: String!
		product: String!
		quantity: Int!
	}

	type CartItem {
		id: ID!
		orderedBy: User!
		cart: Cart
		product: Product!
		quantity: Int!
	}
`;

import { gql } from "apollo-server-lambda";

export default gql`
	extend type Query {
		cartItem(id: String!): CartItem
		allCartItems: [CartItem]
	}

	extend type Mutation {
		createCartItem(cartItemInput: CartItemInput cart_id: String!): CartItem
		updateCartItem(cartItem_id: String! cart_id: String! cartItemInput: CartItemInput): CartItem
		deleteCartItem(cartItem_id: String! cart_id: String!): Boolean
	}

	type CartItem {
		id: ID!
		orderedBy: User!
		cart: Cart
		product: Product!
		quantity: Int!
	}

	input CartItemInput {
		
		product: String!
		quantity: Int!
	}
`;

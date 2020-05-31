import { gql } from "apollo-server-lambda";

export default gql`
	extend type Query {
		cart: Cart
	}

	extend type Mutation {
		updateCart(cartInput: CartInput): Cart
		deleteCart(cart_id: String!): Boolean
	}

	type Cart {
		id: ID
		user: User
		total: Float
		orderedItems: [CartItem]
		product: String
	}

	input CartInput {
		orderedItems: [ProductInput!]
	}
`;

import { gql } from "apollo-server-lambda";

export default gql`
	extend type Query {
		cart: Cart
	}

	extend type Mutation {
		updateCart(cart_id: String cartInput: CartInput): Cart
		deleteCart(cart_id: String!): Boolean
	}

	type Cart {
		id: ID
		user: User
		total: Float
		orderedItems: [CartItem]
	}

	input CartInput {
		orderedBy: String
		total: Float!
		orderedItems: [String!]
	}
`;

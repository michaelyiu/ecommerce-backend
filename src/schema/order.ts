import { gql } from "apollo-server-lambda";

export default gql`
	extend type Query {
		order(user_id: String!): Order
	}

	extend type Mutation {
		addNewOrder: Order
	}

	type Order {
		id: ID
		user_id: User
		products: [Product]
	}
`;

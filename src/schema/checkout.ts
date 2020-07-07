import { gql } from "apollo-server-lambda";

export default gql`


	extend type Mutation {
		createOrder(total_bill:Float!): StripeKeys
	}

	type StripeKeys {
		client_secret: String!
	}

`;
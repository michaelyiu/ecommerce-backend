import { gql } from "apollo-server-lambda";

export default gql`
	extend type Query {
		product(id: ID!): Product
		allProducts: [Product]
	}

	extend type Mutation {
		addNewProduct(category: String, name: String!, price: Float!, image: String): Product!
	}

	type Product {
		id: ID
		category: String
		name: String
		price: Float
		image: String
	}
`;
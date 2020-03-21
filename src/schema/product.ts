import { gql } from "apollo-server-lambda";

export default gql`
	extend type Query {
		product(id: ID!): Product
		allProducts: [Product]
	}

	extend type Mutation {
		addNewProduct(category: String!, name: String!, price: Float!, image: String!): Product!
		updateProduct(product_id: String! productInput: ProductInput): Product!
		deleteProduct(product_id: String!): Boolean!
	}



	type Product {
		id: ID!
		category: String!
		name: String!
		price: Float!
		image: String!
	}

	input ProductInput {
		category: String!
		name: String!
		price: Float!
		image: String!
	}
`;
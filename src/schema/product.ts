import { gql } from "apollo-server-lambda";

export default gql`
	extend type Query {
		allProducts: [Product]
		product(id: String!): Product
		searchProducts(name: String!): [Product]
	}

	extend type Mutation {
		addNewProduct(productInput: ProductInput!): Product!
		updateProduct(product_id: String! productInput: ProductInput): Product!
		deleteProduct(product_id: String!): Boolean!
	}



	type Product {
		id: ID!
		category: String!
		name: String!
		price: Float!
		images: [String!]!
		description: String!
		brand: String!
	}

	input ProductInput {
		id: String
		category: String!
		name: String!
		price: Float!
		images: [String!]!
		description: String!
		quantity: Int
		brand: AvailableBrands!
	}

	enum AvailableBrands{
		APPLE
		HTC
		HUAWEI
		LENOVO
		ONEPLUS
		SAMSUNG
		SONY
		XIAOMI
	}
`;
import { IResolvers } from 'graphql-tools';
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from './authorization';
// import { AuthenticationError, UserInputError } from "apollo-server-lambda";

const productResolvers: IResolvers = {
	Query: {
		allProducts: combineResolvers(
			async (_, { }, { models }): Promise<string> => {
				return models.Product.find({})
			}
		),
		product: combineResolvers(
			async (_, args, { models }): Promise<string> => {
				return models.Product.findById(args.id)
			}
		)
	},
	Mutation: {
		// substitute isAuthenticated for an isAdmin alternative afterwards
		// only admins will be able to add new products
		addNewProduct: combineResolvers(
			isAuthenticated,
			async (_, args, { models }): Promise<string> => {
				return await models.Product.create(args);
			}
		),
		updateProduct: combineResolvers(
			isAuthenticated,
			async (_, { productInput, product_id }, { models }): Promise<string> => {
				const product = await models.Product.findOneAndUpdate(
					{ _id: product_id },
					productInput,
					{ upsert: true, new: true }
				)
				return product;
			}
		),
		deleteProduct: combineResolvers(
			isAuthenticated,
			async (_, { product_id }, { models }): Promise<Boolean> => {
				const product = models.Product.findByIdAndDelete(product_id)
					.then(() => true);
				return product;
			}
		),

	}
}
export default productResolvers;

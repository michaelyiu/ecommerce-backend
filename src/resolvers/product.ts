import { IResolvers } from 'graphql-tools';
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from './authorization';
// import { AuthenticationError, UserInputError } from "apollo-server-lambda";

const productResolvers: IResolvers = {
	Query: {
		allProducts: combineResolvers(
			async (_: any, args: any, { models }: any): Promise<string> => {
				return models.Product.find({})
			}
		),
		product: combineResolvers(
			async (_: any, args: any, { models }: any): Promise<string> => {
				return models.Product.findById(args.id)
			}
		)
	},
	Mutation: {
		// substitute isAuthenticated for an isAdmin alternative afterwards
		// only admins will be able to add new products
		addNewProduct: combineResolvers(
			isAuthenticated,
			async (_: any, args: any, { models }: any): Promise<string> => {
				return await models.Product.create(args);
			}
		)
	}
}
export default productResolvers;

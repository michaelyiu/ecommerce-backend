import { IResolvers } from 'graphql-tools';
import { combineResolvers } from "graphql-resolvers";
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
		addNewProduct: combineResolvers(
			async (_: any, args: any, { models }: any): Promise<string> => {
				return args
			}
		)
	}
}
export default productResolvers;

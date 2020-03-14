import { IResolvers } from 'graphql-tools';
import { combineResolvers } from "graphql-resolvers";
// import { AuthenticationError, UserInputError } from "apollo-server-lambda";

const orderResolvers: IResolvers = {
	Query: {
		order: combineResolvers(
			async (_: any, args: any, { models }: any): Promise<string> => {
				return models.order.findById(args.user_id)
			}
		)
	},
	Mutation: {
		addNewOrder: combineResolvers(
			async (_: any, args: any, { models }: any): Promise<string> => {
				return "test"
			}
		)
	}
}
export default orderResolvers;

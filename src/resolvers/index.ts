import { GraphQLDateTime } from "graphql-iso-date";
import userResolvers from "./user";
import productResolvers from "./product";
import cartResolvers from "./cart";
import cartItemResolvers from "./cartItem";

const customScalarResolver = {
	Date: GraphQLDateTime,
};

export default [
	customScalarResolver,
	userResolvers,
	productResolvers,
	cartResolvers,
	cartItemResolvers,
];
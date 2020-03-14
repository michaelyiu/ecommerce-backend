import { GraphQLDateTime } from "graphql-iso-date";
import userResolvers from "./user";
import productResolvers from "./product";
import orderResolvers from "./order";

const customScalarResolver = {
	Date: GraphQLDateTime,
};

export default [
	customScalarResolver,
	userResolvers,
	productResolvers,
	orderResolvers,
];
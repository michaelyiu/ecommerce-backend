import { gql } from "apollo-server-lambda";

import userSchema from "./user";
import productSchema from "./product";
import cartSchema from "./cart";
import cartItemSchema from "./cartItem";

const linkSchema = gql`
  scalar Date
  
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

//schema stitch
export default [
  linkSchema,
  userSchema,
  productSchema,
  cartSchema,
  cartItemSchema,
]
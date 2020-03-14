import { gql } from "apollo-server-lambda";

import userSchema from "./user";
import productSchema from "./product";
import orderSchema from "./order";

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
  orderSchema,
]
import { ApolloServer, AuthenticationError } from "apollo-server-lambda";
import "reflect-metadata";
import resolvers from "../resolvers";
import schemas from "../schema";
import * as mongoose from "mongoose";
import { verify } from "jsonwebtoken";
import models from "../models";
import { MONGODB_URI, SECRET } from "../utils/constants";

export interface IToken extends Document {
  name: string;
  email: string;
  password: string;
}
//validate jwt then set me in graphql server context
const getMe = async (token: any) => {

  if (token) {
    try {
      const user = await verify(token, SECRET)
      return user;
    } catch (e) {
      throw new AuthenticationError("Your Session expired. Sign in again.");
    }
  }

  return null;
};


const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  // context: async () => {
  context: async ({ event }) => {
    const user = await getMe(event.headers.authorization);
    return {
      models,
      me: user,
      secret: SECRET
    }
  }
});

mongoose
  .connect(MONGODB_URI, { 'useUnifiedTopology': true, 'useNewUrlParser': true })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(err => {
    console.log(err);
  });

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});

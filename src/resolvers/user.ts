// import bcrypt from "bcryptjs";
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { createToken } from "../connectors/jwt";
import { IResolvers } from 'graphql-tools';
import { combineResolvers } from "graphql-resolvers";
import { AuthenticationError, UserInputError } from "apollo-server-lambda";
import { isAuthenticated } from './authorization';

const userResolvers: IResolvers = {
	Query: {
		hello: () => {
			return "Hello dere";
		},
		allUsers: combineResolvers(
			async (_: any, args: any, { models }: any): Promise<string> => {
				console.log(args)
				// auth check for every query and mutation except for the signup mutation
				return models.User.find({});
			}
		),
		user: combineResolvers(
			isAuthenticated,
			async (_: any, { email }: any, { models }: any): Promise<string> => {
				// auth check for every query and mutation except for the signup mutation
				return models.User.findOne({ email });
			}
		)
	},
	Mutation: {
		signUp: async (_: any, args: any, { models }: any): Promise<string> => {
			const { email, password, name } = args;

			const salt = genSaltSync(10)
			const hashedPassword = await hashSync(password, salt);
			const checkIfExists = await models.User.findOne({ email }).then();

			if (checkIfExists) {
				throw new UserInputError("Sign up failed!");
			}
			else {
				const newUser = models.User.create({
					email,
					password: hashedPassword,
					name
				});
				return newUser;
			}
		},

		signIn: async (_: any, args, { models, secret }) => {

			const { email } = args;
			const user = await models.User.findOne({ email }).then(async (user: any) => {
				if (!user) {
					throw new UserInputError("Login failed!");
				}

				const passwordIsValid = await compareSync(args.password, user.password);

				if (!passwordIsValid) {
					throw new AuthenticationError("Invalid login/password!")
				}

				return user;
			});

			const token = await createToken(user, secret, '7d');
			console.log(token);
			return {
				// name: user.name,
				email: user.email,
				token
			}
		}
	}
}

export default userResolvers
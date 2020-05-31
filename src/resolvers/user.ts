// import bcrypt from "bcryptjs";
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { createToken } from "../connectors/jwt";
import { IResolvers } from 'graphql-tools';
import { combineResolvers } from "graphql-resolvers";
import { AuthenticationError, UserInputError } from "apollo-server-lambda";
import { isAuthenticated } from './authorization';

const validateRegisterInput = require('./../validation/register');
const validateLoginInput = require('./../validation/login');

const userResolvers: IResolvers = {
	Query: {
		hello: () => {
			return "Hello dere";
		},
		allUsers: combineResolvers(
			async (_, { }, { models }): Promise<string> => {
				// auth check for every query and mutation except for the signup mutation
				return models.User.find({});
			}
		),
		user: combineResolvers(
			isAuthenticated,
			async (_, { email }, { models }): Promise<string> => {
				// auth check for every query and mutation except for the signup mutation
				return models.User.findOne({ email });
			}
		)
	},
	Mutation: {
		signUp: async (_, args, { models }): Promise<string> => {
			const { errors, isValid } = validateRegisterInput(args);
			if (!isValid) {
				errors.name = 'test'
				throw new UserInputError("Register failed!", { errors })
			}
			const { email, password, name } = args;

			const salt = genSaltSync(10)
			const hashedPassword = await hashSync(password, salt);
			const checkIfExists = await models.User.findOne({ email }).then();

			if (checkIfExists) {
				throw new UserInputError("This email account already exists in our database!", { errors });
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

		signIn: async (_, args, { models, secret }) => {
			const { errors, isValid } = validateLoginInput(args);
			if (!isValid) {
				throw new UserInputError("Login failed!", { errors })
			}

			const { email, password } = args;
			const user = await models.User.findOne({ email }).then(async (user: any) => {
				if (!user) {
					errors.email = "Login email not found!";
					throw new UserInputError("Login failed!", { errors });
				}

				const passwordIsValid = await compareSync(password, user.password);

				if (!passwordIsValid) {
					throw new AuthenticationError("Invalid login/password!")
				}

				return user;
			});

			const token = await createToken(user, secret, '7d');
			console.log(token);
			return {
				name: user.name,
				email: user.email,
				token
			}
		}
	}
}

export default userResolvers
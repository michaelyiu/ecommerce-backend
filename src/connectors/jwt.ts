const jwt = require("jsonwebtoken");

interface IUser {
	id: string;
	email: string;
}

const createToken = async (user: IUser, secret: string, expiresIn: string) => {
	const { id, email } = user;
	return await jwt.sign({ id, email }, secret, {
		algorithm: "HS256",
		// expiresIn: "7d"
		expiresIn
	});
};

export { createToken };
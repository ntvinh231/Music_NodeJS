import User from '../Models/userModel.js';
import httpError from 'http-errors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const ACCESS_TOKEN_SECRET = '7f302edb383631b8bfec2992cbfeddfb';
//const REFESH_TOKEN_SECRET = "661ad7e807581b33b0e2b7c8ce625439";

export default async (request, response, next) => {
	const { email, password } = request.body;

	if (!email || !password) return next(httpError(400, 'Email & Password is required!'));

	const user = await User.findOne({ email: email });
	if (!user) return next(httpError(401, 'Unauthorized.'));

	const isPasswordMatch = await bcrypt.compare(password, user.password);
	if (!isPasswordMatch) return next(httpError(401, 'Unauthorized.'));

	const accessToken = jwt.sign({ id: user._id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
	//const refeshToken = jwt.sign({ id: user._id }, REFESH_TOKEN_SECRET, { expiresIn: '365d' });

	await response.cookie('accessToken', accessToken, { httpOnly: true }, { signed: true });
	return response.json({
		status: 200,
		message: 'Login suscess.',
		accessToken,
	});
};

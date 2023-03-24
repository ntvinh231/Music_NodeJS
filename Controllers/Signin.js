import User from '../Models/userModel.js';
import httpError from 'http-errors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';



export default async (request, response, next) => {
    const { email, password } = request.body;

    if (!email || !password)
        return next(httpError(400, 'Email & Password is required!'));

    const user = await User.findOne({ email: email });
    if (!user)
        return next(httpError(401, 'Unauthorized.'));

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
        return next(httpError(401, 'Unauthorized.'));

    const accessToken = jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    //const refeshToken = jwt.sign({ id: user._id }, process.env.REFESH_TOKEN_SECRET, { expiresIn: '365d' });

    await response.cookie('music/cookie', accessToken, { httpOnly: true, signed: true });
    return response.json({
        status: 200,
        message: 'Login suscess.',
        accessToken
    });
    
};
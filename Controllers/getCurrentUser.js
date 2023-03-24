import User from '../Models/userModel.js';
import httpError from 'http-errors';

export default async (request, response, next) => {
    try {
        const user = await User.findById(request.userData.id);
        if (!user) {
            return next(
                httpError(
                    404, "User not found."
                ));
        }
        response.status(200).json({
            status: 200,
            data: {
                userID: user._id,
                email: user.email
            }
        });
    } catch (error) {
        return next(
            httpError(
                500, "Internal Server Error"
            ));
    }
};

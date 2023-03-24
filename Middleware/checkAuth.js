import jwt from 'jsonwebtoken';
import httpError from 'http-errors';

const ACCESS_TOKEN_SECRET = "7f302edb383631b8bfec2992cbfeddfb";

const checkAuth = (request, response, next) => {

    const accessToken = request.header('Authorization')?.split("Bearer ")[1];
    if (!accessToken) return next(
        httpError(
            401, "Access token is missing."
        ));
    try {
        const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        request.userData = decoded;
        next();
    } catch (error) {
        return next(
            httpError(
                401, "Invalid access token."
            ));
    }
};

export default checkAuth;
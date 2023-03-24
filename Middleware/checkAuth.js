import jwt from 'jsonwebtoken';
import httpError from 'http-errors';

const checkAuth = (request, response, next) => {

    const accessToken = request.header('Authorization')?.split("Bearer ")[1];
    if (!accessToken) return next(
        httpError(
            401, "Access token is missing."
        ));
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
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
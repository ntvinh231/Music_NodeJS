import User from '../Models/userModel.js';
import Music from '../Models/musicModel.js';
import httpError from 'http-errors';

export default async (request, response, next) => {
    try {
        const user = await User.findById(request.userData.id);
        if (!user) {
            return next(
                httpError(
                    404, "User not found."
                ));
        };
        
        const list_music = await Music.find({ _id: { $in: user.list_music } });
        response.status(200).json({
            status: 200,
            list_music: list_music
        });
    }
    catch (error) {
        return next(
            httpError(
                500, "Internal Server Error"
            ));
    }
};

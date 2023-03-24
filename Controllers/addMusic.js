import User from '../Models/userModel.js';
import Music from '../Models/musicModel.js';
import jwt from 'jsonwebtoken';
import httpError from 'http-errors';

const ACCESS_TOKEN_SECRET = "7f302edb383631b8bfec2992cbfeddfb";

export default async (request, response, next) => {

    const accessToken = request.header('Authorization')?.split("Bearer ")[1];
    const { name, author, url, id, links: { images: [{ url: url1 }, { url: url2 }] } } = request.body;

    if (!name && !author && !url && !id && !url1 && !url2)
        return next(
            httpError(
                400, "Bad Request."
            ));

    const _id = await jwt.verify(accessToken, ACCESS_TOKEN_SECRET).id
    const user = await User.findOne({ _id: _id });
    if (user) {

        const songName = await (await Music.find({ _id: { $in: user.list_music } })).map(item => item?.name);
        if (songName.includes(name))
            return next(
                httpError(
                    409, "Song already exists."
                ));

        const newMusic = new Music({
            name,
            author,
            url,
            id,
            links: {
                images: [
                    {
                        url: url1
                    },
                    {
                        url: url2
                    }
                ]
            }
        });

        const music = await newMusic.save();
        await User.findByIdAndUpdate(user._id, { $push: { list_music: music._id } }, { new: true });
        user.list_music.push(music._id);
        const musicUpdate = await Music.find({ _id: { $in: user.list_music } });


        return response.json({
            status: 200,
            messages: "Updating song successfully.",
            list_music: musicUpdate


        });
    }
    else
        return next(
            httpError(
                500, "Updating song failed."
            ));

};

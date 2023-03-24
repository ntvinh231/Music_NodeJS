import User from '../Models/userModel.js';
import bcrypt from 'bcryptjs';
import httpError from 'http-errors';

export default async (request, response, next) => {
    const { email, password } = request.body;
    const validateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Check if the email and password exist or not.
    if (!email || !password) {
        return next(
            httpError(400, "Email & Password is required!")
        );
    };

    //Validate input of various email types
    if(!validateEmail.test(email)){
        return next(
            httpError(400, "Invalid email format.")
        );
    };

    // Check if the email exists in the database or not.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(
            httpError(409, "Email already exists!")
        );
    }

    try {
        // Save the user and encrypt the password.
        const newUser = new User({
            email,
            password: await bcrypt.hash(password, 10),
            list_music: []
        });
        await newUser.save();

        return response.status(200).json({
            status: 200,
            message: "User added successfully!"
        });

    }
    catch (error) {
        console.log(error);
        return next(
            httpError(500, "Internal Server Error")
        );
    }
};
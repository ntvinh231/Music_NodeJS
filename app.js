import express from 'express';
import cookieParser from 'cookie-parser';
import httpError from 'http-errors';
import { Connect } from './database/Connect.js';
import userRouter from './Routers/userRouter.js'
import updateRouter from './Routers/updateRouter.js'

const app = express();

app.set('json spaces', 4);
app.use(express.json());
app.use(cookieParser());

//Connect to MongoDB
Connect('mongodb+srv://vinh:123123aA@cluster0.uojtt91.mongodb.net/?retryWrites=true&w=majority');

//Use Router
app.use('/api/users', userRouter);
app.use('/api/update', updateRouter);

//404 handler and pass to errror handler
app.use((request, response, next) => {
    next(
        httpError(
            404, "Not Found"
        ));
});

//error handler
app.use((error, request, response, next) => {
    response.status(
        error.status || 500
    );
    response.send({
        error: {
            status: error.status,
            message: error.message
        }
    });
});

app.listen(80, () => {
    console.log('Server started on port 80...');
});
const express = require('express');
require('dotenv').config();
const connectDB = require('./data/index');
connectDB();
const genreRouter = require('./router/genre')
const userRouter = require('./router/user')
const novelRouter = require('./router/novel')
const chapterRouter = require('./router/chapter')
const errorHandler = require('./middleware/error')

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/genre', genreRouter);
app.use('/novel', novelRouter);
app.use('/chapter',chapterRouter);

app.use(errorHandler);


app.listen(process.env.port, () => {
    console.log(`server listen ${process.env.port}`)
})
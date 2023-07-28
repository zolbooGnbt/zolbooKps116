const express = require('express');
require('dotenv').config();
const connectDB = require('./data/index');
connectDB();
const userRouter = require('./router/userRouter')
const categoryRouter = require('./router/categoryRouter')
const postRouter = require('./router/postRouter')
const errorHandler = require('./middleware/error')

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/post', postRouter);


app.use(errorHandler);


app.listen(process.env.port, () => {
    console.log(`server listen ${process.env.port}`)
})
import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieSession from 'cookie-session'

import booksRouter from './routes/books'
import userRouter from './routes/user'
const passportSetup = require('./utils/passportSetup');

dotenv.config()
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    console.log('Welcome to Manage a Book Trading Club!!!!')
    res.send({ message: 'Welcome to Manage a Book Trading Club!!!!' })
})

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => {
        console.log('MongoDb connected.......')
        return app.listen(PORT)
    })
    .then(res => {
    console.log(`Server running on port ${PORT}`)
})

app.use('/api/books', booksRouter)
app.use('/', userRouter)

export default app;

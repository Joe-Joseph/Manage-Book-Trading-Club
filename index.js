import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import booksRouter from './routes/books'
import userRouter from './routes/user'
import requestsRouter from './routes/requests'

dotenv.config()
const app = express()
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
app.use('/api/user', userRouter)
app.use('/api/requests', requestsRouter)

export default app;

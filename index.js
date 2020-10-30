import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import booksRouter from './routes/books'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
dotenv.config()

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

export default app;

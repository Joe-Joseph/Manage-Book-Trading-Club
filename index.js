import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    console.log('Welcome to Manage a Book Trading Club!!!!')
    res.send({ message: 'Welcome to Manage a Book Trading Club!!!!' })
})

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})

export default app;

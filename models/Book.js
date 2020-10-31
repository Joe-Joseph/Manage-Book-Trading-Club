import { model, Schema } from 'mongoose'

const bookSchema = new Schema({
    name: String,
    author: String,
    image: Object,
    createdAt: String
})

const Book = model('Book', bookSchema)

export default Book

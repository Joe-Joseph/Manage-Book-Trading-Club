import { model, Schema } from 'mongoose'

const requestSchema = new Schema({
    booksToGive: [{ bookId: String }],
    booksToReceive: [{ bookId: String }],
    userId: String,
    status: String,
    createdAt: String
})

const Request = model('Request', requestSchema)

export default Request

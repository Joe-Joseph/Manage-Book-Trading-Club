import { model, Schema } from 'mongoose'


const requestSchema = new Schema({
    booksToGive: Array,
    booksToReceive: Array,
    userId: String,
    status: String,
    createdAt: String
})

const Request = model('Request', requestSchema)

export default Request

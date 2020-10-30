import validateBook from '../utils/validations'
import Book from '../models/Book'

const addBook = async (req, res) => {
    try {
        const { name, author } = req.body

        const { valid, errors } = validateBook(name, author)
        if(!valid) {
            return res.status(400).json({
                status: 400,
                error: errors
            })
        }

        const book = new Book({
            name,
            author,
            createdAt: new Date().toISOString()
        })

        const newBook = await book.save()
        return res.status(201).json({
            status: 201,
            data: newBook
        })
    }catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Server error'
        })
    }
    
}

export default addBook

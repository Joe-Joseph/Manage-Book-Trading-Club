import fs from 'fs'

import validateBook from '../utils/validations'
import Book from '../models/Book'
import uploads from '../utils/cloudinary'

const addBook = async (req, res) => {
    try {
        const { name, author } = req.body
        let url
        const uploader = async (path) => await uploads(path, 'Images')
        console.log('IMAGESSSSS', req.file)
        if(req.method === 'POST'){
            const { path } = req.file
            const newPath = await uploader(path)
            url = newPath
            fs.unlinkSync(path)
        }

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
            image: url,
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

const getAllBooks = async (req, res) => {
    const books = await Book.find()

    return res.status(200).json({
        status: 200,
        data: books
    })
}

export { addBook, getAllBooks }

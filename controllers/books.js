import fs from 'fs'

import { validateBook } from '../utils/validations'
import Book from '../models/Book'
import uploads from '../utils/cloudinary'
import multer from '../middleware/multer'

const addBook = async (req, res) => {
    try {
        const uploadImage = multer.single('image')

        uploadImage(req, res, async (err) => {
            if (err) {
                // A Multer error occurred when uploading.
                return res.status(400).json({
                    status: 400,
                    error: err.message
                })
            } 
            // Everything went fine.
            const uploader = async (path) => await uploads(path, 'Images')

            const { path } = req.file
            const newPath = await uploader(path)
            const url = newPath
            fs.unlinkSync(path)

            const { name, author } = req.body
            const { userId } = req.user

            console.log('USER HANO HHH', req.user);

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
                userId,
                createdAt: new Date().toISOString()
            })

            const newBook = await book.save()
            return res.status(201).json({
                status: 201,
                data: newBook
            })
        })
    }catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Server error'
        })
    }
    
}

const getAllBooks = async (req, res) => {
    try{
        const books = await Book.find()

        if(books.length < 1) {
            return res.status(404).json({
                status: 404,
                error: 'Thre is no registered book'
            })
        }

        return res.status(200).json({
            status: 200,
            data: books
        })
    }catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Server error'
        })
    }
}

export { addBook, getAllBooks }

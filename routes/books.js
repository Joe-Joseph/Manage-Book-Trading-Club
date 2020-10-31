import express from 'express'

import { addBook, getAllBooks } from '../controllers/books'
import multer from '../middleware/multer'

const router = express.Router()

router.route('/')
    .post(multer.single('image'), addBook)
    .get(getAllBooks)

export default router

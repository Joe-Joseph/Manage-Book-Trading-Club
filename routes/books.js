import express from 'express'

import { addBook, getAllBooks } from '../controllers/books'
// import multer from '../middleware/multer'
import isLoggedIn from '../middleware/auth'

const router = express.Router()

router.route('/')
    .post(isLoggedIn, addBook)
    .get(getAllBooks)

export default router

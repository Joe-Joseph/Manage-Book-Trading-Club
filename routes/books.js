import express from 'express'

import { addBook, getAllBooks, getBooksForUser } from '../controllers/books'
// import multer from '../middleware/multer'
import isLoggedIn from '../middleware/auth'

const router = express.Router()

router.route('/')
    .post(isLoggedIn, addBook)
    .get(getAllBooks)

router.get('/user', isLoggedIn, getBooksForUser)

export default router

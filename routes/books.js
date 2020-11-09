import express from 'express'

import { addBook, getAllBooks, getBooksForUser, getOneBook } from '../controllers/books'
import isLoggedIn from '../middleware/auth'

const router = express.Router()

router.route('/')
    .post(isLoggedIn, addBook)
    .get(getAllBooks)

router.get('/user', isLoggedIn, getBooksForUser)
router.get('/:id', getOneBook)

export default router

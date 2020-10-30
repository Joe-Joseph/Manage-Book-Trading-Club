import express from 'express'

import addBook from '../controllers/books'

const router = express.Router()

router.route('/').post(addBook)

export default router

import express from 'express'

import { createRequest } from '../controllers/requests'
import isLoggedIn from '../middleware/auth'

const router = express.Router()

router.post('/', isLoggedIn, createRequest)

export default router

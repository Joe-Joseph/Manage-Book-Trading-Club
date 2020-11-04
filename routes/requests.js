import express from 'express'

import { createRequest, getAllRequests } from '../controllers/requests'
import isLoggedIn from '../middleware/auth'

const router = express.Router()

router.post('/', isLoggedIn, createRequest)
router.get('/', getAllRequests)

export default router

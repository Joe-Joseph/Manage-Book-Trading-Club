import express from 'express'
import {
    createUser,
    loginUser,
    getAllUsers,
    modifyUser,
    getUserProfile
} from '../controllers/user'
import isLoggedIn from '../middleware/auth'

const router = express.Router()

router.post('/signup', createUser)
router.post('/login', loginUser)
router.get('/', getAllUsers)
router.get('/profile', isLoggedIn, getUserProfile)
router.put('/profile', isLoggedIn, modifyUser)

export default router;

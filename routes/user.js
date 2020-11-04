import express from 'express'
import {
    createUser,
    loginUser,
    getAllUsers,
    modifyUser
} from '../controllers/user'

const router = express.Router()

router.post('/signup', createUser)
router.post('/login', loginUser)
router.get('/', getAllUsers)
router.put('/:id', modifyUser)

export default router;

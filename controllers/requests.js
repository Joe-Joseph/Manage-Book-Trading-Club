import Request from '../models/Request'
import { validateRequest } from '../utils/validations'

const createRequest = async (req, res) => {
    try{
        const { booksToGive, booksToReceive } = req.body
        const { userId } = req.user

        const { errors, valid } = validateRequest(booksToGive, booksToReceive)
        if(!valid){
            return res.status(400).json({
                status: 400,
                error: errors
            })
        }

        const request = new Request({
            booksToGive,
            booksToReceive,
            userId,
            status: 'Pending'
        })

        const newRequest = await request.save()
        return res.status(201).json({
            status: 201,
            message: 'Request created successfully',
            data: newRequest
        })
    }catch (err) {
        return res.status(500).json({
            status: 500,
            error: err
        })
    }

}

export { createRequest }

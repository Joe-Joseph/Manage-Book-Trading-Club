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

const getAllRequests = async(req, res) => {
    try {
        const allRequest = await Request.find()
        if(!allRequest || allRequest.length < 1){
            return res.status(404).json({
                status: 404,
                error: 'No request found'
            })
        }

        return res.status(200).json({
            status: 200,
            data: allRequest
        })
    } catch (err) {
        return res.status(500).json({
            status: 500,
            error: 'Server error'
        })
    }
}

export { createRequest, getAllRequests }

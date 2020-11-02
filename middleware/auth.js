import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const isLoggedIn = async (req, res, next) => {
    const token = req.headers.authorization

    try{
        if(!token){
            return res.status(401).json({
                status: 401,
                error: 'You are unauthorized'
            })
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(err) {
                return res.status(401).json({
                    status: 401,
                    error: err.message
                })
            } else {
                req.user = decoded
                next()
            }
        })
    }catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Something went wrong'
        })
    }
}

export default isLoggedIn

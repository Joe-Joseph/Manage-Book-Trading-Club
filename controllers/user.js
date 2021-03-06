import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import _ from 'lodash'

import User from '../models/User'
import { validateUser, validateLogin } from '../utils/validations'

dotenv.config()

const createUser  = async(req, res) => {
    try{
        const{
            firstName,
            lastName,
            username,
            password,
            city
        } = req.body

        const { valid, errors } = validateUser(firstName, lastName, username, password, city)
        if(!valid) {
            return res.status(400).json({
                status: 400,
                error: errors
            })
        }

        const userExist = await User.findOne({ username })

        if(userExist){
            return res.status(409).json({
                status: 409,
                error: "Username taken"
            })
        }

        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = new User({
            firstName,
            lastName,
            username,
            password: hashPassword,
            city
        })

        const payload = {
            firstName,
            lastName,
            username,
            userId: newUser._id
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2 days' })
        const user = await newUser.save()

        res.status(201).json({
            status: 201,
            message: 'User created successfully',
            token,
            data: _.pick(user, ['firstName', 'lastName', 'username'])
        })
    }catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Server error'
        })
    }
}

const loginUser = async (req, res) => {
    try{
        const { username, password } = req.body

        const { valid, errors } = validateLogin(username, password)

        if(!valid) {
            return res.status(400).json({
                status: 400,
                error: errors
            })
        }

        const user = await User.findOne({ username })
        if(!user) {
            return res.status(403).json({
                status: 403,
                error: 'Wrong credentials'
            })
        }

        const match = await bcrypt.compare(password, user.password)

        if(!match) {
            return res.status(403).json({
                status: 403,
                error: 'Wrong credentials'
            })
        }

        const {
            firstName,
            lastName,
            _id
        } = user

        const payload = {
            firstName,
            lastName,
            username,
            userId: _id
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2 days'})

        return res.status(200).json({
            status: 200,
            message: 'Logged in successfully',
            token,
            data: _.pick(user, ['firstName', 'lastName', 'username'])
        })
    }catch (err) {
        return res.status(500).json({
            status: 500,
            error: 'Server error'
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        if(!users || users.length < 1){
            res.status(404).json({
                status: 404,
                error: 'No user found'
            })
        }
        res.status(200).json({
            status: 200,
            data: users
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Server error'
        })
    }
}

const getUserProfile = async (req, res) => {
    try{
        const { userId } = req.user
        const user = await User.findById(userId)

        if(!user) {
            return status(404).json({
                status: 404,
                error: 'User not found'
            })
        }

        return res.status(200).json({
            status: 200,
            data: user
        })
    }catch(err) {
        console.log('Error!!!!', err)
        res.status(500).json({
            status: 500,
            error: 'Server error'
        })
    }
}

const modifyUser = async(req, res) => {
    try {
        const { userId } = req.user
        const user = await User.findById(userId)
        if(!user) {
            res.status(404).json({
                status: 404,
                error: 'User not found'
            })
        }

        await User.findOneAndUpdate(
            { _id: userId },
            req.body,
            {useFindAndModify: false},
            (error, doc) => {
            if(error) {
                return res.status(500).json({
                    status: 500,
                    error: 'Something went wrong'
                })
            }
            if(doc){
                return res.status(200).json({
                    status: 200,
                    message: 'User updated successfully',
                    data: doc
                })
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err
        })
    }
}

export {
    createUser,
    loginUser,
    getAllUsers,
    modifyUser,
    getUserProfile
}

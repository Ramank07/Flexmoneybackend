import express from 'express'
import {createUsers, entry, updateUser,payment} from '../controllers/userControllers.js'

const userRouter = express.Router();

userRouter.post('/',createUsers).get('/',entry).put('/update',updateUser).post('/payment',payment)
export default userRouter;
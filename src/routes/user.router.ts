import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { loginUser, registerUser } from '../controller/user.controller'

const userRouter: Router = Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

export default userRouter

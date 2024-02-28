import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import {
  loginUser,
  refreshToken,
  registerUser
} from '../controller/user.controller'

const userRouter: Router = Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/refresh', refreshToken)

export default userRouter

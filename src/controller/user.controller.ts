import { NextFunction, Request, Response } from 'express'
import {
  inputUserValidation,
  loginUserValidation
} from '../validation/user.validation'
import { createUser, userLogin } from '../services/user.service'
import bcrypt, { compare } from 'bcrypt'
import { encrypt, userCompare } from '../utils/bcrypt'
import { generateAccessToken, generateRefreshToken } from '../utils/jwt'
import UserType from '../types/user.type'

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { error, value } = inputUserValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Input User gagal',
        data: value
      })
    }
    // encrypt password
    value.password = encrypt(value.password)
    delete value.confirmPassword
    const user = await createUser(value)
    res.status(201).json({ message: 'Success', data: user })
  } catch (error: Error | unknown) {
    next(new Error('Error' + String((error as Error).message)))
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { error, value } = loginUserValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Login gagal',
        data: value
      })
    }
    const user: UserType | null = await userLogin(value)
    if (!user) {
      return res.status(400).json({
        error: 'User not found',
        message: 'Login gagal'
      })
    }

    if (!userCompare(value.password, user.password)) {
      return res.status(400).json({
        message: 'Login Gagal | Wrong Data',
        data: user
      })
    }
    // const usr: UserType = {
    //   id: user.user_id,
    //   username: user.name,
    //   email: user.email,
    //   role: user.role
    // }
    user.password = 'xxx'
    const token = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    return res
      .status(201)
      .json({ message: 'Success', data: user, token, refreshToken })
  } catch (error: Error | unknown) {
    next(new Error('Error' + String((error as Error).message)))
  }
}

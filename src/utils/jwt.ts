import 'dotenv'
import jwt, { JwtPayload } from 'jsonwebtoken'
import UserType from '../types/user.type'

const generateAccessToken = (user: UserType): string => {
  return jwt.sign(user, String(process.env.JWT_SECRET), {
    expiresIn: process.env.JWT_EXPIRE_IN || '1800s'
  })
}

const generateRefreshToken = (user: UserType): string => {
  return jwt.sign(user, String(process.env.JWT_REFRESH_SECRET), {
    expiresIn: process.env.JWT_REFRESH_EXPIRED_IN || '86000s'
  })
}

const verifyToken = (token: string): string | null | JwtPayload => {
  try {
    return jwt.verify(token, String(process.env.JWT_REFRESH_SECRET))
  } catch (error) {
    return null
  }
}

const parseJwt = (token: string): UserType => {
  return JSON.parse(
    Buffer.from(token.split('.')[1], 'base64').toString('ascii')
  )
}

const verifyAccessToken = (token: string): string | null | JwtPayload => {
  try {
    return jwt.verify(token, String(process.env.JWT_SECRET))
  } catch (error) {
    return null
  }
}

export {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  parseJwt,
  verifyAccessToken
}

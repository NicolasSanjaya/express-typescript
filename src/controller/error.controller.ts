import { NextFunction, Request, Response } from 'express'
import logger from '../utils/winston'
import { verifyAccessToken } from '../utils/jwt'

export const errorHandling = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const message = err.message.split(' - ')[1]
  logger.error(err)
  res.status(500).json({
    message: 'Internal Server Error',
    data: null
  })
}

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Halaman tidak ditemukan',
    data: null
  })
}

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]
  if (token === undefined) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Anda harus login terlebih dahulu',
      data: null
    })
  }
  const user = verifyAccessToken(String(token))
  if (!user) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Anda harus login terlebih dahulu',
      data: null
    })
  }
  next()
}

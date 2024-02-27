import { Router } from 'express'
import barangRouter from './barang.route'
import { errorHandling, notFound } from '../controller/error.controller'
import userRouter from './user.router'

const app = Router()

app.use('/api', barangRouter)
app.use('/api', userRouter)

app.use('*', errorHandling)
app.use('*', notFound)

export default app

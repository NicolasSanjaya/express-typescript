import supertest from 'supertest'
import web from '../middleware/web'
import prisma from '../utils/client'
import { generateRefreshToken } from '../utils/jwt'

const getRefreshToken = (): string => {
  const user = {
    user_id: '12312321',
    email: 'nicolassanjaya4823@gmail',
    name: 'nicolassanjaya',
    password: 'nicolassanjaya3',
    role: 'regular',
    created_at: new Date(),
    updated_at: new Date()
  }
  const token = generateRefreshToken(user)
  return token
}

describe('user', () => {
  it('user login data valid', async () => {
    const response = await supertest(web).post('/api/login').send({
      email: 'nicolassanjaya4823@gmail.com',
      password: 'nicolassanjaya3'
    })
    expect(response.status).toBe(201)
    expect(response.body.message).toEqual('Success')
  })

  it('user login email tidak valid', async () => {
    const response = await supertest(web).post('/api/login').send({
      email: 'nicolassanjaya@gmail.com',
      password: 'nicolassanjaya3'
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toEqual('Login gagal')
  })

  it('user login password tidak valid', async () => {
    const response = await supertest(web).post('/api/login').send({
      email: 'nicolassanjaya4823@gmail.com',
      password: '123'
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toEqual('Login Gagal | Wrong Data')
  })

  afterEach(async () => {
    await prisma.user.deleteMany({
      where: {
        email: 'nicolassanjaya4825@gmail.com'
      }
    })
  })
  it('register user data valid', async () => {
    const response = await supertest(web).post('/api/register').send({
      email: 'nicolassanjaya4825@gmail.com',
      nama: 'Nicolas Sanjaya',
      password: '123',
      confirmPassword: '123'
    })
    expect(response.status).toBe(201)
    expect(response.body.message).toEqual('Success')
  })

  it('register user data tidak valid', async () => {
    const response = await supertest(web).post('/api/register').send({
      email: 'nicolassanjaya4825@gmail.com',
      nama: 'Nicolas Sanjaya',
      password: '123',
      confirmPassword: '12345'
    })
    expect(response.status).toBe(400)
    expect(response.body.message).toEqual('Input User gagal')
  })

  it('refresh token valid', async () => {
    const refreshToken = getRefreshToken()
    const response = await supertest(web)
      .post('/api/refresh')
      .set('Authorization', `Bearer ${refreshToken}`)
    expect(response.status).toBe(201)
    expect(response.body.message).toEqual('Success')
  })
  it('refresh token tidak valid', async () => {
    const refreshToken = getRefreshToken()
    const response = await supertest(web)
      .post('/api/refresh')
      .set('Authorization', `Bearer 123`)
    expect(response.status).toBe(401)
    expect(response.body.message).toEqual('Anda harus login terlebih dahulu')
  })
})

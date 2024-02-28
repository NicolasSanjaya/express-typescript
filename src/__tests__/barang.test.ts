import supertest from 'supertest'
import { generateAccessToken } from '../utils/jwt'
import web from '../middleware/web'
import prisma from '../utils/client'

const getToken = (): string => {
  const user = {
    user_id: '12312321',
    email: 'nicolassanjaya4823@gmail',
    name: 'nicolassanjaya',
    password: 'nicolassanjaya3',
    role: 'regular',
    created_at: new Date(),
    updated_at: new Date()
  }
  return generateAccessToken(user)
}

describe('barang', () => {
  it('ambil semua data barang', async () => {
    const token = getToken()
    // const res = await fetch('http://localhost:3000/api/barang', {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    const response = await supertest(web)
      .get('/api/barang')
      .set('Authorization', `Bearer ${token}`)
    expect(response?.status).toBe(200)
    expect(response.body.data).toBeDefined()
    expect(response.body.data.length).toBeGreaterThan(0)
    expect(response?.body?.message).toEqual('Success Get All Data')
  })

  it('ambil semua data barang tanpa token', async () => {
    const token = getToken()
    // const res = await fetch('http://localhost:3000/api/barang', {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    const response = await supertest(web)
      .get('/api/barang')
      .set('Authorization', `Bearer 123`)
    expect(response?.status).toBe(401)
    expect(response.body.data).toBeDefined()
    expect(response?.body?.message).toEqual('Anda harus login terlebih dahulu')
  })

  it('ambil data barang by id', async () => {
    const token = getToken()
    const id = 1
    const response = await supertest(web)
      .get('/api/barang/' + id)
      .set('Authorization', `Bearer ${token}`)
      .send({
        id
      })
    expect(response?.status).toBe(200)
    expect(response?.body?.message).toEqual('Success Get Data')
  })

  it('input data barang', async () => {
    const token = getToken()
    const barang = {
      nama: 'test',
      jumlah: 10,
      harga: 100
    }
    const response = await supertest(web)
      .post('/api/barang')
      .set('Authorization', `Bearer ${token}`)
      .send(barang)
    expect(response?.status).toBe(200)
    expect(response?.body?.message).toEqual('Success')
  })

  it('update data barang', async () => {
    const token = getToken()
    const id = 25
    const barang = {
      nama: 'test updated',
      jumlah: 100,
      harga: 500
    }
    const response = await supertest(web)
      .put('/api/barang/' + id)
      .set('Authorization', `Bearer ${token}`)
      .send(barang)
    expect(response?.status).toBe(200)
    expect(response?.body?.message).toEqual('Success')
  })

  it('delete data barang', async () => {
    const token = getToken()
    const id = 27
    const response = await supertest(web)
      .delete('/api/barang/' + id)
      .set('Authorization', `Bearer ${token}`)
    expect(response?.status).toBe(200)
    expect(response?.body?.message).toEqual('Delete Data Berhasil')
  })

  afterAll(async () => {
    await prisma.barang.deleteMany({
      where: {
        id: 28
      }
    })
  })
})

import { Router } from 'express'
import {
  deleteDataBarang,
  getAllBarang,
  getBarangId,
  insertDataBarang,
  updateDataBarang
} from '../controller/barang.controller'
import { authentication } from '../controller/error.controller'

const barangRouter: Router = Router()

barangRouter.get('/barang', authentication, getAllBarang)

barangRouter.get('/barang/:id', authentication, getBarangId)

barangRouter.post('/barang', authentication, insertDataBarang)

barangRouter.put('/barang/:id', authentication, updateDataBarang)

barangRouter.delete('/barang/:id', authentication, deleteDataBarang)

export default barangRouter

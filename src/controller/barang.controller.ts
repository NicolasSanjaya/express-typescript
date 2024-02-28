import {
  deleteBarang,
  getBarang,
  getBarangById,
  insertBarang,
  updateBarang
} from './../services/barang.service'
import { type NextFunction, type Request, type Response } from 'express'
import { inputBarangValidation } from '../validation/barang.validation'
import BarangType from '../types/barangTypes'

export const getAllBarang = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const data = await getBarang()
    return res.status(200).json({ message: 'Success Get All Data', data })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error pada file src/controller/barang.controller.ts: getAllBarang' +
          String((error as Error).message)
      )
    )
  }
}

export const getBarangId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const id = Number(req.params.id)
    const data = await getBarangById(id)
    return res.status(200).json({ message: 'Success Get Data', data })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error pada file src/controller/barang.controller.ts' +
          String((error as Error).message)
      )
    )
  }
}

export const insertDataBarang = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { error, value } = inputBarangValidation(req.body)
    insertBarang(value)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Input Data gagal',
        data: value
      })
    }
    return res.status(200).json({ message: 'Success', data: value })
  } catch (error: Error | unknown) {
    next(new Error('Error' + String((error as Error).message)))
  }
}

export const updateDataBarang = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { error, value } = inputBarangValidation(req.body)
    value.id = Number(req.params.id)
    updateBarang(value)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Update Data gagal',
        data: value
      })
    }
    return res.status(200).json({ message: 'Success', data: value })
  } catch (error: Error | unknown) {
    next(new Error('Error' + String((error as Error).message)))
  }
}

export const deleteDataBarang = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const id = Number(req.params.id)
    deleteBarang(id)
    return res.status(200).json({
      message: 'Delete Data Berhasil'
    })
  } catch (error: Error | unknown) {
    next(new Error('Error' + String((error as Error).message)))
  }
}

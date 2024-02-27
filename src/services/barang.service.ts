import BarangType from '../types/barangTypes'
import prisma from '../utils/client'

export const getBarang = async (): Promise<BarangType[] | null> => {
  return await prisma.barang.findMany()
}

export const getBarangById = async (id: number): Promise<BarangType | null> => {
  return await prisma.barang.findUnique({
    where: {
      id
    }
  })
}

export const insertBarang = async (
  payload: BarangType
): Promise<BarangType> => {
  return await prisma.barang.create({
    data: payload
  })
}

export const updateBarang = async (
  payload: BarangType
): Promise<BarangType> => {
  return await prisma.barang.update({
    where: {
      id: payload.id
    },
    data: { ...payload }
  })
}

export const deleteBarang = async (id: number): Promise<BarangType> => {
  return await prisma.barang.delete({
    where: {
      id
    }
  })
}

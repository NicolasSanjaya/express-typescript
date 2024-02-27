import { Decimal } from '@prisma/client/runtime/library'

export default interface BarangType {
  id: number
  nama: string
  harga: Decimal
  jumlah: number
  created_at?: Date
  updated_at?: Date
}

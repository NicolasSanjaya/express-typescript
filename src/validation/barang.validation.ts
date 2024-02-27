import joi from 'joi'
import type BarangType from '../types/barangTypes'

export const inputBarangValidation = (
  payload: BarangType
): joi.ValidationResult<BarangType> => {
  const schema = joi
    .object({
      nama: joi.string().required().messages({
        'any.required': 'Nama harus diisi',
        'string.base': 'Nama harus berupa string'
      }),
      harga: joi.number().required().messages({
        'any.required': 'Harga harus diisi',
        'number.base': 'Harga harus berupa angka'
      }),
      jumlah: joi.number().required().messages({
        'any.required': 'Jumlah harus diisi',
        'number.base': 'Jumlah harus berupa angka'
      })
    })
    .required()
  return schema.validate(payload)
}

import joi from 'joi'
import UserType from '../types/user.type'

export const inputUserValidation = (
  payload: UserType
): joi.ValidationResult<UserType> => {
  const schema = joi.object({
    user_id: joi.string().trim().allow(null, ''),
    email: joi.string().trim().email().required().messages({
      'string.base': 'Email harus berupa string',
      'string.email': 'Email harus berupa email',
      'any.required': 'Email harus diisi'
    }),
    name: joi.string().trim().required().messages({
      'string.base': 'Name harus berupa string',
      'any.required': 'Name harus diisi'
    }),
    password: joi.string().min(3).max(15).trim().required().messages({
      'string.base': 'Password harus berupa string',
      'any.required': 'Password harus diisi',
      'string.min': 'Password minimal 3 karakter',
      'string.max': 'Password maksimal 15 karakter'
    }),
    confirmPassword: joi
      .any()
      .equal(joi.ref('password'))
      .required()
      .label('Confirm Password')
      .messages({
        'any.only': 'Konfirmasi password harus sama dengan password'
      }),
    role: joi.string().trim().allow(null, '')
  })
  return schema.validate(payload)
}

export const loginUserValidation = (
  payload: UserType
): joi.ValidationResult<UserType> => {
  const schema = joi.object({
    email: joi.string().trim().email().required().messages({
      'string.base': 'Email harus berupa string',
      'string.email': 'Email harus berupa email'
    }),
    password: joi.string().trim().required().messages({
      'string.base': 'Password harus berupa string',
      'any.required': 'Password harus diisi'
    })
  })
  return schema.validate(payload)
}

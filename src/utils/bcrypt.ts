import bcrypt from 'bcrypt'

const saltRound = 10

export const encrypt = (password: string): string => {
  return bcrypt.hashSync(password, saltRound)
}

export const userCompare = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash)
}

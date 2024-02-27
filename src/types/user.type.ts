export default interface UserType {
  user_id: string
  email: string
  name: string
  password: string
  confirmPassword?: string
  role: string
  created_at?: Date
  updated_at?: Date
}

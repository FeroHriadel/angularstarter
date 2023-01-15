export interface UserModel {
    email: string
    password?: string
    passwordHash?: string
    id?: string
    createdAt?: string
    isAdmin?: 'true' | 'false' | null
}
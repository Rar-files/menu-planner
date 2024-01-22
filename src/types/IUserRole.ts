import { Role } from '@prisma/client'

export interface IUserRole {
    email: string
    role?: Role
}

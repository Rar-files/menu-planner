export interface IUserRole {
    email: string
    role?: Role
}

export type Role = 'User' | 'Admin'

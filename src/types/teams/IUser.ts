import { Role } from '@prisma/client'
import { ITeamUser } from './ITeamUser'

export interface IUser {
    id: string
    role: Role
    teams: ITeamUser[]
}

export interface IUserCreateDTO {
    id: string
    role: Role
}

export interface IUserUpdateDTO {
    role: Role
}

import { Role } from '@prisma/client'
import { ITeamUser } from '../teams/ITeamUser'
import { IAuthUser } from './IAuthUser'

export interface IUser extends IAuthUser {
    role: Role
    teams: ITeamUser[]
}

export interface IUserUpdateRoleDTO {
    role: Role
}

import { TeamRole } from '@prisma/client'
import { ITeam } from './ITeam'
import { IUser } from '../users/IUser'

export interface ITeamUser {
    id: string
    team?: ITeam
    teamId: number
    user?: IUser
    userId: string
    teamRole: TeamRole
}

export interface ITeamUserDTO {
    teamId: number
    userId: string
    teamRole: TeamRole
}

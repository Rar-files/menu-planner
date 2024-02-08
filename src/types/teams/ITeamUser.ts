import { TeamRole } from '@prisma/client'
import { IUser } from './IUser'
import { ITeam } from './ITeam'

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

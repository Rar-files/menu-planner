import { IMealEvent } from './IMealEvent'
import { ITeamUser } from './ITeamUser'

export interface ITeam {
    id: number
    name: string
    slug: string
    mealEvents: IMealEvent[]
    users: ITeamUser[]
}

export interface ITeamDTO {
    name: string
}

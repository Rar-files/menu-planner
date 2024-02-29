import { MealType } from '@prisma/client'
import { IMealEvent } from './IMealEvent'
import { ITeamUser } from './ITeamUser'

export interface ITeam {
    id: number
    name: string
    slug: string
    viewMealTypes: MealType[]
    mealEvents: IMealEvent[]
    users: ITeamUser[]
}

export interface ITeamDTO {
    name: string
}

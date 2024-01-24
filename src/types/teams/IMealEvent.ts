import { MealType } from '@prisma/client'
import { IMeal } from '../meals/IMeal'
import { ITeam } from './ITeam'

export interface IMealEvent {
    id: number
    slug: string
    type: MealType
    date?: string
    meal: IMeal
    mealId: number
    team: ITeam
    teamId: number
}

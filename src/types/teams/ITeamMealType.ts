import { MealType } from '@prisma/client'
import { ITeam } from './ITeam'

export interface ITeamMealType {
    team?: ITeam
    teamId: number
    mealType: MealType
}

import { IIngredient } from './IIngredient'

export interface IMeal {
    id: string
    slug: string
    name: string
    description: string
    type: MealType
    date: string
    ingredients?: IIngredient[]
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

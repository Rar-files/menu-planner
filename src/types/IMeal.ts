import { MealType } from '@prisma/client'
import { IIngredient, IIngredientCreateDTO } from './IIngredient'

export interface IMeal {
    id: number
    slug: string
    name: string
    description: string
    type: MealType
    date: string
    ingredients?: IIngredient[]
}

export interface IMealCreateDTO {
    name: string
    description: string
    type: MealType
    date: string
    ingredients: IIngredientCreateDTO[]
}

export interface IMealUpdateDTO {
    name?: string
    description?: string
    type?: MealType
    date?: string
    slug?: string
}

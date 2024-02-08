import { IIngredient, IIngredientCreateDTO } from './IIngredient'
import { IMealEvent } from '../teams/IMealEvent'

export interface IMeal {
    id: number
    slug: string
    name: string
    description: string
    mealEvents: IMealEvent[]
    ingredients?: IIngredient[]
}

export interface IMealCreateDTO {
    name: string
    description: string
    ingredients: IIngredientCreateDTO[]
}

export interface IMealUpdateDTO {
    name?: string
    description?: string
}

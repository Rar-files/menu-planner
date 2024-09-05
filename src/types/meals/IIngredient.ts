import { IMeal } from './IMeal'
import { IProduct } from './IProduct'

export interface IIngredient {
    id: number
    product: IProduct
    productId: number
    meal: IMeal
    mealId: number
    quantity: number
}

export interface IIngredientCreateDTO {
    productSlug: string
    quantity: number
}

export interface IIngredientUpdateDTO {
    productId?: number
    productSlug?: string
    mealId?: number
    mealSlug?: string
    quantity?: number
}

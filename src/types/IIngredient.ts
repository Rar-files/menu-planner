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

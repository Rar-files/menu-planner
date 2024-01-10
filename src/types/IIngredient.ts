import { IMeal } from './IMeal'
import { IProduct } from './IProduct'

export interface IIngredient {
    id: string
    product: IProduct
    productId: string
    meal: IMeal
    mealId: string
    quantity: number
}

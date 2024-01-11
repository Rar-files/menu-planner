import { IIngredient } from './IIngredient'

export interface IProduct {
    id: string
    slug: string
    name: string
    unit: Unit
    pricePerUnit: number
    ingredients?: IIngredient[]
}

export type Unit = 'kg' | 'apiece' | 'ml'

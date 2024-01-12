import { IIngredient } from './IIngredient'

export interface IProduct {
    id: number
    slug: string
    name: string
    unit: Unit
    pricePerUnit: number
    ingredients?: IIngredient[]
}

export interface IProductDTO {
    name: string
    unit: Unit
    pricePerUnit: number
}

export interface IProductUpdateDTO {
    name?: string
    unit?: Unit
    pricePerUnit?: number
}

export type Unit = 'kg' | 'apiece' | 'ml'

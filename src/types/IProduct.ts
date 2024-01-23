import { Unit } from '@prisma/client'
import { IIngredient } from './IIngredient'

export interface IProduct {
    id: number
    slug: string
    name: string
    unit: Unit
    pricePerUnit: number
    ingredients?: IIngredient[]
}

export interface IProductCreateDTO {
    name: string
    unit: Unit
    pricePerUnit: number
}

export interface IProductUpdateDTO {
    name?: string
    unit?: Unit
    pricePerUnit?: number
}

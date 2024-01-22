// Hidden for simplicity
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Unit } from '@prisma/client'

export const productSchema = yup.object().shape({
    name: yup.string().required(),
    unit: yup.mixed<Unit>().oneOf(['kg', 'apiece', 'ml']).required(),
    pricePerUnit: yup.number().required(),
})

const ProductResolver = yupResolver(productSchema)

export default ProductResolver

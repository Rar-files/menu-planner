// Hidden for simplicity
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const productSchema = yup.object().shape({
    name: yup.string().required(),
    unit: yup
        .string()
        .required()
        .matches(/(kg|apiece|ml)/),
    pricePerUnit: yup.number().required(),
})

const ProductResolver = yupResolver(productSchema)

export default ProductResolver

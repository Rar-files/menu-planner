// Hidden for simplicity
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { MealType } from '@prisma/client'

export const mealSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    type: yup
        .mixed<MealType>()
        .oneOf(['breakfast', 'lunch', 'dinner', 'snack'])
        .required(),
    date: yup.string().required(),
})

const MealResolver = yupResolver(mealSchema)

export default MealResolver

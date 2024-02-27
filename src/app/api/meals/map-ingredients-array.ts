import { prisma } from '@/services/prisma'
import { IIngredientCreateDTO } from '@/types/meals/IIngredient'

export const MapIngredientsArray = async (
    ingredients: IIngredientCreateDTO[]
): Promise<
    {
        productId: number
        quantity: number
    }[]
> => {
    let validatorResult = null

    const mappedIngredients = await Promise.all(
        ingredients.map(async (ingredient) => {
            const product = await prisma.product.findUnique({
                where: { slug: ingredient.productSlug },
                select: { id: true },
            })
            const id = !product ? 0 : product.id
            if (id === 0)
                validatorResult = `Product with slug: ${ingredient.productSlug}`
            return {
                productId: id,
                quantity: ingredient.quantity,
            }
        })
    )

    if (validatorResult) throw new Error(validatorResult)

    return mappedIngredients
}

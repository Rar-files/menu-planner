import { NotFound, Ok } from '@/app/api/predefined-responses'
import { prisma } from '@/services/prisma'
import { Ingredient } from '@prisma/client'

export const GET = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    if (!params.slug) return NotFound('Slug')

    const productMentions = await prisma.product.findUnique({
        where: {
            slug: params.slug,
        },
        include: {
            ingredients: true,
        },
    })

    if (!productMentions) return NotFound(`Product with slug ${params.slug}`)

    const TotalQuantityUsed = (ingredients: Ingredient[]): number => {
        const ingredient = ingredients.pop()
        if (!ingredient) return 0
        return ingredient.quantity + TotalQuantityUsed(ingredients)
    }

    const responseData = {
        id: productMentions.id,
        slug: productMentions.slug,
        name: productMentions.name,
        pricePerUnit: productMentions.pricePerUnit,
        totalQuantityUsed: TotalQuantityUsed(productMentions.ingredients),
    }

    return Ok(responseData)
}

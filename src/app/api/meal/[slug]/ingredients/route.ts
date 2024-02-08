import { prisma } from '@/services/prisma'
import { NotFound, Ok } from '../../../predefined-responses'

export const GET = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    if (!params.slug) return NotFound('slug')

    const ingredients = await prisma.ingredient.findMany({
        where: {
            meal: {
                slug: params.slug,
            },
        },
        include: {
            product: true,
        },
    })

    if (!ingredients)
        return NotFound(`Ingredients contains meal with slug ${params.slug}`)

    return Ok(ingredients)
}

import { prisma } from '@/services/prisma'
import {
    BadRequest,
    Forbidden,
    NotFound,
    Ok,
    Unauthorized,
} from '../../../predefined-responses'
import { IIngredientUpdateDTO } from '@/types/meals/IIngredient'
import { useServerAuth } from '@/hooks/auth/useServerAuth'

export const GET = async (
    request: Request,
    { params }: { params: { id: string } }
) => {
    if (!params.id) return NotFound('id')

    const ingredient = await prisma.ingredient.findUnique({
        where: {
            id: +params.id,
        },
        include: {
            product: true,
            meal: true,
        },
    })

    if (!ingredient) return NotFound(`Ingredient with id: ${params.id}`)

    return Ok(ingredient)
}

export const PUT = async (
    request: Request,
    { params }: { params: { id: string } }
) => {
    const { isLoggedIn, hasAdminPermission } = await useServerAuth()

    if (!params.id) return NotFound('id')
    const ingredientId = +params.id

    if (!isLoggedIn()) return Unauthorized()
    if (hasAdminPermission()) return Forbidden()

    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    let body: IIngredientUpdateDTO = await request.json()

    const ingredientToUpdate = await prisma.ingredient.findUnique({
        where: {
            id: ingredientId,
        },
    })

    if (!ingredientToUpdate) return NotFound(`Ingredient with id: ${params.id}`)

    if (!body.mealId) {
        if (body.mealSlug) {
            const meal = await prisma.meal.findUnique({
                where: { slug: body.mealSlug },
            })
            if (!meal) return NotFound(`Meal with slug: ${body.mealSlug}`)
            body.mealId = meal.id
        }
    }

    if (!body.productId) {
        if (body.productSlug) {
            const product = await prisma.product.findUnique({
                where: { slug: body.productSlug },
            })
            if (!product)
                return NotFound(`Product with slug: ${body.productSlug}`)
            body.productId = product.id
        }
    }

    const updatedIngredient = await prisma.ingredient.update({
        where: {
            id: ingredientId,
        },
        include: {
            product: true,
            meal: true,
        },
        data: {
            ...ingredientToUpdate,
            ...body,
        },
    })

    return Ok(updatedIngredient)
}

export const DELETE = async (
    request: Request,
    { params }: { params: { id: string } }
) => {
    const { isLoggedIn, hasAdminPermission } = await useServerAuth()
    if (!isLoggedIn()) return Unauthorized()
    if (hasAdminPermission()) return Forbidden()

    let isRemoved = true
    await prisma.ingredient
        .delete({
            where: {
                id: +params.id,
            },
        })
        .catch(() => {
            isRemoved = false
        })

    if (!isRemoved) return NotFound(`Ingredient with id ${params.id}`)

    return Ok()
}

import { prisma } from '@/services/prisma'
import {
    BadRequest,
    Forbidden,
    NotFound,
    Ok,
    Unauthorized,
} from '../../predefined-responses'
import { IMealUpdateDTO } from '@/types/meals/IMeal'
import { useServerAuth } from '@/hooks/auth/useServerAuth'
import { useSlug } from '@/hooks/useSlug'

export const GET = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    if (!params.slug) return NotFound('slug')

    const meal = await prisma.meal.findUnique({
        where: {
            slug: params.slug,
        },
        include: {
            ingredients: {
                include: {
                    product: true,
                },
            },
        },
    })

    if (!meal) return NotFound(`Meal with slug ${params.slug}`)

    return Ok(meal)
}

export const PUT = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    const { toSlug } = useSlug()
    const { isLoggedIn, hasAdminPermission } = await useServerAuth()
    if (!isLoggedIn()) return Unauthorized()
    if (hasAdminPermission()) return Forbidden()

    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    let body: IMealUpdateDTO = await request.json()
    const mealToUpdate = await prisma.meal.findUnique({
        where: {
            slug: params.slug,
        },
    })

    if (!mealToUpdate) return NotFound(`Meal with slug ${params.slug}`)

    const data = body.name
        ? {
              ...body,
              slug: toSlug([body.name]),
          }
        : { ...body, slug: undefined }

    const updatedMeal = await prisma.meal.update({
        where: {
            slug: params.slug,
        },
        include: {
            ingredients: {
                include: {
                    product: true,
                },
            },
        },
        data: {
            ...mealToUpdate,
            ...data,
        },
    })

    return Ok(updatedMeal)
}

export const DELETE = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    const { isLoggedIn, hasAdminPermission } = await useServerAuth()
    if (!isLoggedIn()) return Unauthorized()
    if (hasAdminPermission()) return Forbidden()

    let isRemoved = true
    await prisma.meal
        .delete({
            where: {
                slug: params.slug,
            },
        })
        .catch(() => {
            isRemoved = false
        })

    if (!isRemoved) return NotFound(`Product with slug ${params.slug}`)

    return Ok()
}

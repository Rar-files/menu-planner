import { prisma } from '@/services/prisma'
import { BadRequest, NotFound, Ok } from '../../predefined-responses'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/services/auth'
import { CheckIsAdmin } from '../../auth/check-auth-status'
import { IMealUpdateDTO } from '@/types/meals/IMeal'
import { GetMealSlug } from '../get-meal-slug'

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
    const session = await getServerSession(authOptions)
    const isAdminStatus = await CheckIsAdmin(session)
    if (isAdminStatus !== true) return isAdminStatus

    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    let body: IMealUpdateDTO = await request.json()
    const mealToUpdate = await prisma.meal.findUnique({
        where: {
            slug: params.slug,
        },
    })

    if (!mealToUpdate) return NotFound(`Meal with slug ${params.slug}`)

    if (body.name || body.date || body.type) {
        body = {
            ...body,
            slug: GetMealSlug({
                ...mealToUpdate,
                ...body,
            }),
        }
    }

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
            ...body,
        },
    })

    return Ok(updatedMeal)
}

export const DELETE = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    const session = await getServerSession(authOptions)
    const isAdminStatus = await CheckIsAdmin(session)
    if (isAdminStatus !== true) return isAdminStatus

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

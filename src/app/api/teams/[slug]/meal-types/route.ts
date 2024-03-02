import { prisma } from '@/services/prisma'
import {
    BadRequest,
    Created,
    NotFound,
    Ok,
    Unauthorized,
} from '../../../predefined-responses'
import { MealType } from '@prisma/client'
import { useServerAuth } from '@/hooks/auth/useServerAuth'

const getMealTypes = (slug: string) =>
    prisma.teamMealType.findMany({
        where: {
            team: {
                slug: slug,
            },
        },
        select: {
            mealType: true,
        },
    })

const deleteTeamMealTypes = (slug: string) =>
    prisma.teamMealType.deleteMany({
        where: {
            team: {
                slug: slug,
            },
        },
    })

export const GET = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    if (!params.slug) return NotFound('slug')

    const mealTypes = await getMealTypes(params.slug)

    if (!mealTypes)
        return NotFound(`Meal types used by team with slug ${params.slug}`)

    return Ok(mealTypes)
}

export const POST = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    const { isLoggedIn } = await useServerAuth()
    if (!isLoggedIn()) return Unauthorized()
    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    if (!params.slug) return NotFound('slug')

    const team = await prisma.team.findFirst({
        where: {
            slug: params.slug,
        },
    })

    if (!team) return NotFound(`Team with slug ${params.slug}`)

    const body: MealType[] = await request.json()
    const toCreate = mapMealsArray(body, team.id)

    const mealTypes = await prisma.teamMealType.createMany({
        data: toCreate,
        skipDuplicates: true,
    })

    return Created(mealTypes)
}

export const PUT = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    const { isLoggedIn } = await useServerAuth()
    if (!isLoggedIn()) return Unauthorized()
    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    if (!params.slug) return NotFound('slug')

    const team = await prisma.team.findFirst({
        where: {
            slug: params.slug,
        },
    })

    if (!team) return NotFound(`Team with slug ${params.slug}`)

    await deleteTeamMealTypes(params.slug)

    const body: MealType[] = await request.json()
    const toCreate = mapMealsArray(body, team.id)

    const mealTypes = await prisma.teamMealType.createMany({
        data: toCreate,
        skipDuplicates: true,
    })

    return Ok(mealTypes)
}

const mapMealsArray = (array: MealType[], teamId: number) =>
    array.map((mealType) => ({ mealType, teamId }))

export const DELETE = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    const { isLoggedIn } = await useServerAuth()
    if (!isLoggedIn()) return Unauthorized()

    if (!params.slug) return NotFound('slug')

    const team = await prisma.team.findFirst({
        where: {
            slug: params.slug,
        },
    })

    if (!team) return NotFound(`Team with slug ${params.slug}`)

    await deleteTeamMealTypes(params.slug)

    return Ok()
}

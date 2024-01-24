import { prisma } from '@/services/prisma'
import {
    BadRequest,
    NotFound,
    Ok,
    Unauthorized,
} from '../../../predefined-responses'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/services/auth'
import { CheckIsAdmin } from '../../../auth/check-auth-status'
import { IMealCreateDTO, IMealUpdateDTO } from '@/types/meals/IMeal'
import { NextResponse } from 'next/server'

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

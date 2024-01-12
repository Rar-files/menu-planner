import { prisma } from '@/services/prisma'
import {
    BadRequest,
    Forbidden,
    NotFound,
    Ok,
    Unauthorized,
} from '../../predefined-responses'
import { IProductUpdateDTO } from '@/types/IProduct'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/services/auth'
import { GetUserRole } from '../../../../../prisma/GetUserRole'

export const GET = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    if (!params.slug) return NotFound('Slug')

    const product = await prisma.product.findUnique({
        where: {
            slug: params.slug,
        },
    })

    if (!product) return NotFound(`Product with slug ${params.slug}`)

    return Ok(product)
}

export const PUT = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    const session = await getServerSession(authOptions)

    if (!session) return Unauthorized()
    if (!session.user) return Unauthorized()
    if (!session.user.email) return Unauthorized()

    const role = await GetUserRole(session.user.email)

    if (role != 'Admin') return Forbidden()

    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    const body = await request.json()

    const pricePerUnitToUpdate = body.pricePerUnit ? +body.pricePerUnit : null

    const productToUpdate: IProductUpdateDTO = {
        ...body,
        pricePerUnit: pricePerUnitToUpdate,
    }

    const updatedProduct = await prisma.product.update({
        where: {
            slug: params.slug,
        },
        data: {
            ...productToUpdate,
        },
    })

    return Ok(updatedProduct)
}

export const DELETE = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    const session = await getServerSession(authOptions)

    if (!session) return Unauthorized()
    if (!session.user) return Unauthorized()
    if (!session.user.email) return Unauthorized()

    const role = await GetUserRole(session.user.email)

    if (role != 'Admin') return Forbidden()

    let isRemoved = true
    await prisma.product
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

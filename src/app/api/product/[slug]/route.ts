import { prisma } from '@/services/prisma'
import { BadRequest, NotFound, Ok } from '../../predefined-responses'
import { IProductUpdateDTO } from '@/types/meals/IProduct'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/services/auth'
import { CheckIsAdmin } from '../../auth/check-auth-status'

export const GET = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    if (!params.slug) return NotFound('slug')

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
    const isAdminStatus = await CheckIsAdmin(session)
    if (isAdminStatus !== true) return isAdminStatus

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
    const isAdminStatus = await CheckIsAdmin(session)
    if (isAdminStatus !== true) return isAdminStatus

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

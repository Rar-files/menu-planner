import { prisma } from '@/services/prisma'
import { IProductDTO } from '@/types/IProduct'
import {
    BadRequest,
    Created,
    Forbidden,
    NotFound,
    Ok,
    Unauthorized,
} from '../predefined-responses'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/services/auth'
import { GetUserRole } from '../../../../prisma/GetUserRole'

export const GET = async () => {
    const products = await prisma.product.findMany()

    if (!products) return NotFound('Products table')

    return Ok(products)
}

export const POST = async (request: Request) => {
    const session = await getServerSession(authOptions)

    if (!session) return Unauthorized()
    if (!session.user) return Unauthorized()
    if (!session.user.email) return Unauthorized()

    const role = await GetUserRole(session.user.email)

    if (role != 'Admin') return Forbidden()

    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    const body = await request.json()
    const productToCreate: IProductDTO = {
        ...body,
        pricePerUnit: +body.pricePerUnit,
    }

    if (!productToCreate.name) return BadRequest('Name')
    if (!productToCreate.unit) return BadRequest('Unit')
    if (!productToCreate.pricePerUnit) return BadRequest('PricePerUnit')

    const product = await prisma.product.create({
        data: {
            slug: productToCreate.name
                .toLocaleLowerCase()
                .replace(' ', '-')
                .replace(/[^\w-]+/g, ''),
            ...productToCreate,
        },
    })

    return Created(product)
}

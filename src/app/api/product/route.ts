import { prisma } from '@/services/prisma'
import { IProductCreateDTO } from '@/types/meals/IProduct'
import {
    BadRequest,
    Created,
    Forbidden,
    NotFound,
    Ok,
    Unauthorized,
} from '../predefined-responses'
import { useServerAuth } from '@/hooks/auth/useServerAuth'

export const GET = async () => {
    const products = await prisma.product.findMany()

    if (!products) return NotFound('Products table')

    return Ok(products)
}

export const POST = async (request: Request) => {
    const { isLoggedIn, hasAdminPermission } = await useServerAuth()
    if (isLoggedIn()) return Unauthorized()
    if (hasAdminPermission()) return Forbidden()

    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    const body = await request.json()
    const productToCreate: IProductCreateDTO = {
        ...body,
        pricePerUnit: +body.pricePerUnit,
    }

    if (!productToCreate.name) return BadRequest('name')
    if (!productToCreate.unit) return BadRequest('unit')
    if (!productToCreate.pricePerUnit) return BadRequest('pricePerUnit')

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

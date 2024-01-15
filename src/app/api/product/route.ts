import { prisma } from '@/services/prisma'
import { IProductCreateDTO } from '@/types/IProduct'
import { BadRequest, Created, NotFound, Ok } from '../predefined-responses'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/services/auth'
import { CheckIsAdmin } from '../auth/check-auth-status'

export const GET = async () => {
    const products = await prisma.product.findMany()

    if (!products) return NotFound('Products table')

    return Ok(products)
}

export const POST = async (request: Request) => {
    const session = await getServerSession(authOptions)
    const isAdminStatus = await CheckIsAdmin(session)
    if (isAdminStatus !== true) return isAdminStatus

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

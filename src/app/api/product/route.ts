import { prisma } from '@/services/prisma'
import { IProductDTO } from '@/types/IProduct'
import { BadRequest, Created, NotFound, Ok } from '../predefined-responses'

export const GET = async () => {
    const products = await prisma.product.findMany()

    if (!products) return NotFound('Products table')

    return Ok(products)
}

export const POST = async (request: Request) => {
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

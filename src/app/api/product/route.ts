import { prisma } from '@/services/prisma'
import { IProductDTO } from '@/types/IProduct'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async () => {
    const products = await prisma.product.findMany()

    if (!products) {
        return NextResponse.json(
            { message: 'Products table not found in database' },
            { status: 503 }
        )
    }

    return NextResponse.json(products, { status: 200 })
}

export const POST = async (request: NextRequest) => {
    const BadRequest = (paramName: string) =>
        NextResponse.json(
            { message: `${paramName} is required` },
            { status: 400 }
        )

    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body')

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

    return NextResponse.json(product, { status: 201 })
}

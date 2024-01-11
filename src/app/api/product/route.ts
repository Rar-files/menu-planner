import { prisma } from '@/services/prisma'
import { NextResponse } from 'next/server'

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

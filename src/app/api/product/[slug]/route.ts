import { prisma } from '@/services/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    if (!params.slug) {
        return NextResponse.json({ message: 'Slug not found' }, { status: 400 })
    }

    const product = await prisma.product.findUnique({
        where: {
            slug: params.slug,
        },
    })

    if (!product) {
        return NextResponse.json(
            { message: `Product with slug ${params.slug} not found` },
            { status: 404 }
        )
    }

    return NextResponse.json(product, { status: 200 })
}

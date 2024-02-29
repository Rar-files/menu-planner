'use client'

import { notFound } from 'next/navigation'
import Loader from '@/ui/loader'
import Button from '@/ui/elements/button'
import ContentBox from '@/ui/layout/content-box'
import DynamicArea from '@/ui/layout/dynamic-area'
import ToolBar from '@/ui/layout/tool-bar'
import useSWR from 'swr'
import { IProduct } from '@/types/meals/IProduct'

const ProductInfo = ({ params }: { params: { slug: string } }) => {
    const { data: product, isLoading } = useSWR(
        `/api/meals/products/${params.slug}`
    )

    if (!isLoading && product?.length === 0) return notFound()

    return (
        <DynamicArea>
            <ContentBox>
                {isLoading ? (
                    <Loader message="Loading info about product..." />
                ) : (
                    (product as IProduct).name
                )}
            </ContentBox>
        </DynamicArea>
    )
}

export default ProductInfo

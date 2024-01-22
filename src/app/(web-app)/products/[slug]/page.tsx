'use client'

import { notFound } from 'next/navigation'
import Loader from '@/ui/loader'
import Button from '@/ui/button'
import ContentBox from '@/ui/content-box'
import DynamicArea from '@/ui/dynamic-area'
import ToolBar from '@/ui/tool-bar'
import useSWR from 'swr'
import { IProduct } from '@/types/IProduct'

const ProductInfo = ({ params }: { params: { slug: string } }) => {
    const { data: product, isLoading } = useSWR(`/api/product/${params.slug}`)

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

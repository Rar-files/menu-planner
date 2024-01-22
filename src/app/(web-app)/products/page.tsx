'use client'

import Loader from '@/ui/loader'
import Button from '@/ui/button'
import ContentBox from '@/ui/content-box'
import DynamicArea from '@/ui/dynamic-area'
import ToolBar from '@/ui/tool-bar'
import useSWR from 'swr'
import { IProduct } from '@/types/IProduct'
import Link from 'next/link'

const Products = () => {
    const { data: products, isLoading } = useSWR('/api/product')

    return (
        <DynamicArea>
            <ToolBar>
                <Button secondary icon="icon-[mdi--add]" href="products/create">
                    Create
                </Button>
            </ToolBar>
            <ContentBox>
                {isLoading ? (
                    <Loader message="Loading list of products..." />
                ) : (
                    <div className={`flex flex-col`}>
                        {products?.map((product: IProduct, index: number) => (
                            <Link href={`products/${product.slug}`} key={index}>
                                <div className={`m-2 bg-secondary-dark`}>
                                    {product.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </ContentBox>
        </DynamicArea>
    )
}

export default Products

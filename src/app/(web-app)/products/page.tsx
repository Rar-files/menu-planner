'use client'

import Loader from '@/ui/Loader'
import Button from '@/ui/button'
import ContentBox from '@/ui/content-box'
import DynamicArea from '@/ui/dynamic-area'
import ToolBar from '@/ui/tool-bar'
import useSWR from 'swr'

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
                    products?.data.map((product: any) => {})
                )}
            </ContentBox>
        </DynamicArea>
    )
}

export default Products

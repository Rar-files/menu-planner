'use client'

import Loader from '@/ui/loader'
import Button from '@/ui/button'
import ContentBox from '@/ui/content-box'
import DynamicArea from '@/ui/dynamic-area'
import ToolBar from '@/ui/tool-bar'
import useSWR from 'swr'
import DataTable, { IColumn } from '@/ui/data-table'

const Products = () => {
    const { data: products, isLoading } = useSWR('/api/product')

    const tableColumns: IColumn[] = [
        { name: 'name', label: 'Name', width: 'w-1/2' },
        { name: 'unit', label: 'Unit', width: 'w-1/4' },
        {
            name: 'pricePerUnit',
            label: 'Price per unit',
            width: 'w-1/4',
            surfix: 'pln',
        },
    ]

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
                    <DataTable
                        items={products}
                        columns={tableColumns}
                        url="/products"
                    />
                )}
            </ContentBox>
        </DynamicArea>
    )
}

export default Products

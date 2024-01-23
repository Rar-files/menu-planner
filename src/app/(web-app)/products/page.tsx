'use client'

import Loader from '@/ui/loader'
import Button from '@/ui/button'
import ContentBox from '@/ui/content-box'
import DynamicArea from '@/ui/dynamic-area'
import ToolBar from '@/ui/tool-bar'
import useSWR from 'swr'
import { IProduct } from '@/types/IProduct'
import Link from 'next/link'
import DataTable, { IColumn } from '@/ui/data-table'
import Header from '@/ui/data-table/header'
import Cell from '@/ui/data-table/cell'
import DataRow from '@/ui/data-table/data-row'

const Products = () => {
    const { data: products, isLoading } = useSWR('/api/product')

    const tableColumns: IColumn[] = [
        { name: 'name', label: 'Name', width: 'w-12' },
        { name: 'unit', label: 'Unit' },
        { name: 'pricePerUnit', label: 'Price per unit' },
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

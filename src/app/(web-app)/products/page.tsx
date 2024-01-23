'use client'

import Loader from '@/ui/loader'
import Button from '@/ui/button'
import ContentBox from '@/ui/content-box'
import DynamicArea from '@/ui/dynamic-area'
import ToolBar from '@/ui/tool-bar'
import useSWR from 'swr'
import DataTable, { IColumn } from '@/ui/data-table'
import { useSession } from 'next-auth/react'

const Products = () => {
    const { data: products, isLoading } = useSWR('/api/product')
    const { data: session } = useSession()

    const tableColumns: IColumn[] = [
        { name: 'name', label: 'Name', width: 'w-3/5' },
        { name: 'unit', label: 'Unit', width: 'w-1/5' },
        {
            name: 'pricePerUnit',
            label: 'Price per unit',
            width: 'w-1/5',
            surfix: 'pln',
        },
    ]

    return (
        <DynamicArea>
            {session?.user?.role == 'Admin' ? (
                <ToolBar>
                    <Button
                        secondary
                        icon="icon-[mdi--add]"
                        href="products/create"
                    >
                        Create
                    </Button>
                </ToolBar>
            ) : null}
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

'use client'

import Loader from '@/ui/loader'
import { AutoWidthBox, DynamicArea, ToolBar } from '@/ui/layout'
import useSWR from 'swr'
import DataTable, { IColumn } from '@/ui/elements/data-table'
import { useSession } from 'next-auth/react'
import { SearchBar, Button } from '@/ui/elements'
import { useState } from 'react'
import { IProduct } from '@/types/IProduct'

const Products = () => {
    const { data: products, isLoading } = useSWR('/api/product')
    const { data: session } = useSession()
    const [search, setSearch] = useState('')

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
    console.log(search)

    const productsFiltered = isLoading
        ? null
        : products.filter((product: IProduct) =>
              product.name.toLowerCase().includes(search.toLowerCase())
          )

    return (
        <DynamicArea>
            <ToolBar>
                <SearchBar
                    secondary
                    onChange={(event) => setSearch(event.target.value)}
                    onClose={() => setSearch('')}
                ></SearchBar>
                {session?.user?.role == 'Admin' ? (
                    <Button
                        secondary
                        icon="icon-[mdi--add]"
                        href="products/create"
                    >
                        Create
                    </Button>
                ) : null}
            </ToolBar>
            <AutoWidthBox>
                {isLoading ? (
                    <Loader message="Loading list of products..." />
                ) : (
                    <DataTable
                        items={productsFiltered}
                        columns={tableColumns}
                        url="/products"
                    />
                )}
            </AutoWidthBox>
        </DynamicArea>
    )
}

export default Products

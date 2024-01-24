'use client'

import { useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

import Loader from '@/ui/loader'
import { AutoWidthBox, DynamicArea, ToolBar } from '@/ui/layout'
import { SearchBar, Button, DataTable } from '@/ui/elements'
import { IProduct } from '@/types/IProduct'

const Products = () => {
    const { data: products, isLoading } = useSWR('/api/product')
    const { data: session } = useSession()
    const [search, setSearch] = useState('')

    const tableColumns = useMemo(
        () => [
            { key: 'name', label: 'Name', width: 'w-3/5' },
            { key: 'unit', label: 'Unit', width: 'w-1/5' },
            {
                key: 'pricePerUnit',
                label: 'Price per unit',
                width: 'w-1/5',
                surfix: 'pln',
            },
        ],
        []
    )

    const productsFiltered = useMemo(() => {
        if (isLoading) {
            return null
        }
        return products.filter((product: IProduct) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [isLoading, products, search])

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

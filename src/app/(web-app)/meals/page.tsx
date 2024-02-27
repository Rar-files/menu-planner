'use client'

import { useState, useMemo } from 'react'
import useSWR from 'swr'

import Loader from '@/ui/loader'
import { AutoWidthBox, DynamicArea, ToolBar } from '@/ui/layout'
import { SearchBar, Button, DataTable } from '@/ui/elements'
import { useAuth } from '@/hooks/auth/useAuth'
import { IMeal } from '@/types/meals/IMeal'

const Meals = () => {
    const { data: meals, isLoading } = useSWR('/api/meals')
    const { hasChefPermission } = useAuth()
    const [search, setSearch] = useState('')

    const tableColumns = useMemo(
        () => [
            { key: 'name', label: 'Name', width: 'w-2/5' },
            { key: 'description', label: 'Description', width: 'w-3/5' },
        ],
        []
    )

    const mealsFiltered = useMemo(() => {
        if (isLoading) {
            return null
        }
        return meals.filter((meal: IMeal) =>
            meal.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [isLoading, meals, search])

    return (
        <DynamicArea>
            <ToolBar>
                <SearchBar
                    secondary
                    onChange={(event) => setSearch(event.target.value)}
                    onClose={() => setSearch('')}
                ></SearchBar>
                {hasChefPermission() ? (
                    <Button
                        secondary
                        icon="icon-[mdi--add]"
                        href="meals/create"
                    >
                        Create
                    </Button>
                ) : null}
            </ToolBar>
            <AutoWidthBox>
                {isLoading ? (
                    <Loader message="Loading list of meals..." />
                ) : (
                    <DataTable
                        items={mealsFiltered}
                        columns={tableColumns}
                        url="/meals"
                    />
                )}
            </AutoWidthBox>
        </DynamicArea>
    )
}

export default Meals

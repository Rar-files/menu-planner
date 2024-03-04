'use client'

import { useState, useMemo, ReactNode } from 'react'
import useSWR from 'swr'

import Loader from '@/ui/loader'
import { AutoWidthBox, DynamicArea, ToolBar } from '@/ui/layout'
import { SearchBar, Button, DataTable } from '@/ui/elements'
import { ITeam } from '@/types/teams/ITeam'

const TeamsLayout = ({ dialog }: { dialog: ReactNode }) => {
    const { data: teams, isLoading } = useSWR('/api/teams')
    const [search, setSearch] = useState('')

    const tableColumns = useMemo(
        () => [
            { key: 'name', label: 'Name', width: 'w-1/3' },
            { key: 'users', label: 'Users', width: 'w-2/3' },
        ],
        []
    )

    const teamsToView = useMemo(() => {
        if (isLoading) {
            return null
        }
        return teams.map((team: ITeam) => {
            let users = ''
            for (const user of team.users) {
                users += user.user?.name + ', '
            }
            return {
                name: team.name,
                slug: team.slug,
                users: users,
            }
        })
    }, [isLoading, teams])

    const teamsFiltered = useMemo(() => {
        if (!teamsToView) {
            return null
        }

        return teamsToView.filter((team: ITeam) =>
            team.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [search, teamsToView])

    return (
        <DynamicArea>
            {dialog}
            <ToolBar>
                <SearchBar
                    secondary
                    onChange={(event) => setSearch(event.target.value)}
                    onClose={() => setSearch('')}
                ></SearchBar>

                <Button secondary icon="icon-[mdi--add]" href="teams/create">
                    Create
                </Button>
            </ToolBar>
            <AutoWidthBox>
                {isLoading ? (
                    <Loader message="Loading list of teams..." />
                ) : (
                    <DataTable
                        items={teamsFiltered}
                        columns={tableColumns}
                        url="teams/info"
                    />
                )}
            </AutoWidthBox>
        </DynamicArea>
    )
}

export default TeamsLayout

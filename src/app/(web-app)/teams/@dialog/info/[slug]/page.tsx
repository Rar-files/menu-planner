'use client'

import { notFound } from 'next/navigation'
import Loader from '@/ui/loader'
import { DialogBox } from '@/ui/layout/content-box'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { ITeam } from '@/types/teams/ITeam'

const TeamInfo = ({ params }: { params: { slug: string } }) => {
    const { data: team, isLoading } = useSWR(`/api/teams/${params.slug}`)
    const router = useRouter()
    const exit = () => router.push('..')

    if (!isLoading && !team) return notFound()

    return (
        <DialogBox onClose={exit}>
            {isLoading ? (
                <Loader message="Loading info about team..." />
            ) : (
                (team as ITeam).name
            )}
        </DialogBox>
    )
}

export default TeamInfo

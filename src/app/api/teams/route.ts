import { useServerAuth } from '@/hooks/auth/useServerAuth'
import { prisma } from '@/services/prisma'
import { BadRequest, Ok, Unauthorized } from '../predefined-responses'
import { ITeamDTO } from '@/types/teams/ITeam'
import { useSlug } from '@/hooks/useSlug'

export const GET = async () => {
    const { session, isLoggedIn } = await useServerAuth()

    if (!isLoggedIn()) return Unauthorized()

    const teams = await prisma.team.findMany({
        where: {
            users: {
                some: {
                    userId: session?.user?.id,
                },
            },
        },
        include: {
            users: {
                include: {
                    user: true,
                },
            },
        },
    })

    return Ok(teams)
}

export const POST = async (request: Request) => {
    const { toSlug } = useSlug()
    const { session, isLoggedIn } = await useServerAuth()
    if (!isLoggedIn()) return Unauthorized()

    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    const body: ITeamDTO = await request.json()

    const createdTeam = await prisma.team.create({
        data: {
            ...body,
            slug: toSlug(body),
            users: {
                create: {
                    user: {
                        connect: {
                            id: session?.user?.id,
                        },
                    },
                    teamRole: 'owner',
                },
            },
        },
    })

    return Ok(createdTeam)
}

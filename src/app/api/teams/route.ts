import { useServerAuth } from '@/hooks/auth/useServerAuth'
import { prisma } from '@/services/prisma'
import { Ok, Unauthorized } from '../predefined-responses'

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

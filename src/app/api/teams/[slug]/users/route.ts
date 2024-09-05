import { useServerAuth } from '@/hooks/auth/useServerAuth'
import { NotFound, Ok, Unauthorized } from '../../../predefined-responses'
import { prisma } from '@/services/prisma'

export const GET = async (
    request: Request,
    { params }: { params: { slug: string } }
) => {
    const { session, isLoggedIn } = await useServerAuth()

    if (!isLoggedIn()) return Unauthorized()

    const team = await prisma.team.findUnique({
        where: {
            slug: params.slug,
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

    if (!team) return NotFound(`Team with slug ${params.slug}`)

    return Ok(team.users)
}

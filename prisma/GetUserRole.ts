import { prisma } from '@/services/prisma'
import { IUserRole } from '@/types/IUserRole'

export const GetUserRole = async (email: string) => {
    let userRole = await prisma.userRole.findUnique({
        where: {
            email: email,
        },
    })

    if (!userRole)
        userRole = await prisma.userRole.create({
            data: {
                email: email,
                role: 'User',
            },
        })

    return (userRole as IUserRole).role
}

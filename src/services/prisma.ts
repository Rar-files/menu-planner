import { IUserRole } from '@/types/IUserRole'
import { PrismaClient, Prisma } from '@prisma/client'

const getRoleExtension = Prisma.defineExtension({
    name: 'getRole',
    model: {
        userRole: {
            async getRole(email: string) {
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
            },
        },
    },
})

const prismaClientSingleton = () => {
    return new PrismaClient().$extends(getRoleExtension)
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

import { IUser } from '@/types/teams/IUser'
import { Role } from '@prisma/client'
import { PrismaClient, Prisma } from '@prisma/client'

const getRoleExtension = Prisma.defineExtension({
    name: 'getRole',
    model: {
        user: {
            async getRole(id: string) {
                let user = await prisma.user.findUnique({
                    where: {
                        id: id,
                    },
                })

                if (!user)
                    user = await prisma.user.create({
                        data: {
                            id: id,
                            role: 'consumer',
                        },
                    })

                return (user as IUser).role as Role
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

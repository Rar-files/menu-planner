import { IIdRole } from '@/types/IIdRole'
import { IUserRole } from '@/types/IUserRole'
import { Role } from '@prisma/client'
import { PrismaClient, Prisma } from '@prisma/client'

const getRoleExtension = Prisma.defineExtension({
    name: 'getRole',
    model: {
        idRole: {
            async getRole(id: string) {
                let idRole = await prisma.idRole.findUnique({
                    where: {
                        id: id,
                    },
                })

                if (!idRole)
                    idRole = await prisma.idRole.create({
                        data: {
                            id: id,
                            role: 'User',
                        },
                    })

                return (idRole as IIdRole).role as Role
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

import { IAuthUser } from '@/types/users/IAuthUser'
import { IUser } from '@/types/users/IUser'
import { Role } from '@prisma/client'
import { PrismaClient, Prisma } from '@prisma/client'

const getRoleExtension = Prisma.defineExtension({
    name: 'getRole',
    model: {
        user: {
            async auth(googleUser: IAuthUser) {
                let user = await prisma.user.findUnique({
                    where: {
                        id: googleUser.id,
                    },
                })

                if (!user)
                    user = await prisma.user.create({
                        data: {
                            ...googleUser,
                            role: 'consumer',
                        },
                    })

                if (user.image != googleUser.image)
                    await prisma.user.update({
                        where: {
                            id: googleUser.id,
                        },
                        data: {
                            image: googleUser.image,
                        },
                    })

                return user as IUser
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

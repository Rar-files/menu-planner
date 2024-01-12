import { IUserRole } from '@/types/IUserRole'
import { PrismaClient, Prisma } from '@prisma/client'

const prePrisma = new PrismaClient()

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

export const prisma = prePrisma.$extends(getRoleExtension)

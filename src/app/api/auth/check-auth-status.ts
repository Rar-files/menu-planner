import { NextResponse } from 'next/server'
import { Forbidden, Unauthorized } from '../predefined-responses'
import { Session } from 'next-auth'
import { prisma } from '@/services/prisma'

export const CheckIsAdmin = async (
    session: Session | null
): Promise<NextResponse<any> | true> => {
    if (!session) return Unauthorized()
    if (!session.user) return Unauthorized()
    if (!session.user.email) return Unauthorized()

    const role = await prisma.userRole.getRole(session.user.email)

    if (role != 'Admin') return Forbidden()

    return true
}

export const CheckIsAuthorized = async (
    session: Session | null
): Promise<NextResponse<any> | true> => {
    if (!session) return Unauthorized()
    if (!session.user) return Unauthorized()
    if (!session.user.email) return Unauthorized()
    return true
}

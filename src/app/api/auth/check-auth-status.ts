import { NextResponse } from 'next/server'
import { Forbidden, Unauthorized } from '../predefined-responses'
import { Session } from 'next-auth'

export const CheckIsAdmin = async (
    session: Session | null
): Promise<NextResponse<any> | true> => {
    if (!session) return Unauthorized()
    if (!session.user) return Unauthorized()
    if (!session.user.role) return Unauthorized()

    if (session.user.role != 'Admin') return Forbidden()

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

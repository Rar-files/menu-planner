// This is a backdoor endpoint, for put initial admin role to first user in database.
// After this operation recommand to remowe 'USERROLE_PUT_SECRET' env variable to disable this fuction

import { BadRequest, Forbidden, Ok } from '../../predefined-responses'
import { IUserRole } from '@/types/IUserRole'
import { prisma } from '@/services/prisma'
import { NextResponse } from 'next/server'

type SecretUserRoleRequest = {
    secret: string
    userRole: IUserRole
}

export const PUT = async (request: Request) => {
    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    const body: SecretUserRoleRequest = await request.json()

    if (!body.secret) return BadRequest('secret')

    const putSecret = process.env.USERROLE_PUT_SECRET
    if (!putSecret) return NextResponse.json({}, { status: 423 })

    if (body.secret != putSecret) return Forbidden()

    if (!body.userRole) return BadRequest('userRole')
    if (!body.userRole.email) return BadRequest('email')
    if (!body.userRole.role) return BadRequest('role')

    const userRole = await prisma.userRole.update({
        where: {
            email: body.userRole.email,
        },
        data: {
            ...body.userRole,
        },
    })

    return Ok(userRole)
}

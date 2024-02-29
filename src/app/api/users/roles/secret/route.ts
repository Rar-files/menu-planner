// This is a backdoor endpoint, for put initial admin role to first user in database.
// After this operation recommand to remowe 'USERROLE_PUT_SECRET' env variable to disable this fuction

import {
    BadRequest,
    Forbidden,
    NotFound,
    Ok,
} from '../../../predefined-responses'
import { prisma } from '@/services/prisma'
import { IUser } from '@/types/users/IUser'
import { NextResponse } from 'next/server'

type SecretUserRoleRequest = {
    secret: string
    user: IUser
}

export const PUT = async (request: Request) => {
    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    const body: SecretUserRoleRequest = await request.json()

    if (!body.secret) return BadRequest('secret')

    const putSecret = process.env.USERROLE_PUT_SECRET
    if (!putSecret) return NextResponse.json({}, { status: 423 })

    if (body.secret != putSecret) return Forbidden()

    if (!body.user) return BadRequest('userRole')
    if (!body.user.id) return BadRequest('email')
    if (!body.user.role) return BadRequest('role')

    const user = await prisma.user.update({
        where: {
            id: body.user.id,
        },
        data: {
            role: body.user.role,
        },
    })

    if (!user) return NotFound(`User with id ${body.user.id}`)

    return Ok(user)
}

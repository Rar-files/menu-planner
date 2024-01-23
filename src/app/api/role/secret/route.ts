// This is a backdoor endpoint, for put initial admin role to first user in database.
// After this operation recommand to remowe 'USERROLE_PUT_SECRET' env variable to disable this fuction

import { BadRequest, Forbidden, NotFound, Ok } from '../../predefined-responses'
import { prisma } from '@/services/prisma'
import { IIdRole } from '@/types/IIdRole'
import { NextResponse } from 'next/server'

type SecretUserRoleRequest = {
    secret: string
    idRole: IIdRole
}

export const PUT = async (request: Request) => {
    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    const body: SecretUserRoleRequest = await request.json()

    if (!body.secret) return BadRequest('secret')

    const putSecret = process.env.USERROLE_PUT_SECRET
    if (!putSecret) return NextResponse.json({}, { status: 423 })

    if (body.secret != putSecret) return Forbidden()

    if (!body.idRole) return BadRequest('userRole')
    if (!body.idRole.id) return BadRequest('email')
    if (!body.idRole.role) return BadRequest('role')

    const idRole = await prisma.idRole.update({
        where: {
            id: body.idRole.id,
        },
        data: {
            ...body.idRole,
        },
    })

    if (!idRole) return NotFound(`idRole with id ${body.idRole.id}`)

    return Ok(idRole)
}

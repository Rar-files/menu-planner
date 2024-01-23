import { authOptions } from '@/services/auth'
import { getServerSession } from 'next-auth'
import { BadRequest, Created, NotFound, Ok } from '../predefined-responses'
import { prisma } from '@/services/prisma'
import { CheckIsAdmin } from '../auth/check-auth-status'
import { IIdRole } from '@/types/IIdRole'

export const POST = async (request: Request) => {
    const session = await getServerSession(authOptions)
    const isAdminStatus = await CheckIsAdmin(session)
    if (isAdminStatus !== true) return isAdminStatus

    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    const body: IIdRole = await request.json()

    if (!body.id) return BadRequest('email')

    const idRole = await prisma.idRole.create({
        data: {
            ...body,
        },
    })

    return Created(idRole)
}

export const PUT = async (request: Request) => {
    const session = await getServerSession(authOptions)
    const isAdminStatus = await CheckIsAdmin(session)
    if (isAdminStatus !== true) return isAdminStatus

    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    const body: IIdRole = await request.json()

    if (!body.id) return BadRequest('email')
    if (!body.role) return BadRequest('role')

    const idRole = await prisma.idRole.update({
        where: {
            id: body.id,
        },
        data: {
            ...body,
        },
    })

    if (!idRole) return NotFound(`idRole with id ${body.id}`)

    return Ok(idRole)
}

export const DELETE = async (request: Request) => {
    const session = await getServerSession(authOptions)
    const isAdminStatus = await CheckIsAdmin(session)
    if (isAdminStatus !== true) return isAdminStatus

    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    const body: IIdRole = await request.json()

    if (!body.id) return BadRequest('email')

    let isRemoved = true
    await prisma.idRole
        .delete({
            where: {
                id: body.id,
            },
        })
        .catch(() => {
            isRemoved = false
        })

    if (!isRemoved) return NotFound(`idRole with id ${body.id}`)

    return Ok()
}

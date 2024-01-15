import { authOptions } from '@/services/auth'
import { getServerSession } from 'next-auth'
import { BadRequest, Created, NotFound, Ok } from '../predefined-responses'
import { IUserRole } from '@/types/IUserRole'
import { prisma } from '@/services/prisma'
import { CheckIsAdmin } from '../auth/check-auth-status'

export const POST = async (request: Request) => {
    const session = await getServerSession(authOptions)
    const isAdminStatus = await CheckIsAdmin(session)
    if (isAdminStatus !== true) return isAdminStatus

    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    const body: IUserRole = await request.json()

    if (!body.email) return BadRequest('email')

    const userRole = await prisma.userRole.create({
        data: {
            ...body,
        },
    })

    return Created(userRole)
}

export const PUT = async (request: Request) => {
    const session = await getServerSession(authOptions)
    const isAdminStatus = await CheckIsAdmin(session)
    if (isAdminStatus !== true) return isAdminStatus

    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    const body: IUserRole = await request.json()

    if (!body.email) return BadRequest('email')
    if (!body.role) return BadRequest('role')

    const userRole = await prisma.userRole.update({
        where: {
            email: body.email,
        },
        data: {
            ...body,
        },
    })

    return Ok(userRole)
}

export const DELETE = async (request: Request) => {
    const session = await getServerSession(authOptions)
    const isAdminStatus = await CheckIsAdmin(session)
    if (isAdminStatus !== true) return isAdminStatus

    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    const body: IUserRole = await request.json()

    if (!body.email) return BadRequest('email')

    let isRemoved = true
    await prisma.userRole
        .delete({
            where: {
                email: body.email,
            },
        })
        .catch(() => {
            isRemoved = false
        })

    if (!isRemoved) return NotFound(`userRole with email ${body.email}`)

    return Ok()
}

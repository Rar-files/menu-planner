import {
    BadRequest,
    Forbidden,
    NotFound,
    Ok,
    Unauthorized,
} from '../../predefined-responses'
import { prisma } from '@/services/prisma'
import { useServerAuth } from '@/hooks/auth/useServerAuth'
import { IUser } from '@/types/users/IUser'

export const PUT = async (request: Request) => {
    const { isLoggedIn, hasAdminPermission } = await useServerAuth()
    if (isLoggedIn()) return Unauthorized()
    if (hasAdminPermission()) return Forbidden()

    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    const body: IUser = await request.json()

    if (!body.id) return BadRequest('email')
    if (!body.role) return BadRequest('role')

    const user = await prisma.user.update({
        where: {
            id: body.id,
        },
        data: {
            role: body.role,
        },
    })

    if (!user) return NotFound(`User with id ${body.id}`)

    return Ok(user)
}

export const DELETE = async (request: Request) => {
    const { isLoggedIn, hasAdminPermission } = await useServerAuth()
    if (isLoggedIn()) return Unauthorized()
    if (hasAdminPermission()) return Forbidden()

    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    const body: IUser = await request.json()

    if (!body.id) return BadRequest('email')

    let isRemoved = true
    await prisma.user
        .delete({
            where: {
                id: body.id,
            },
        })
        .catch(() => {
            isRemoved = false
        })

    if (!isRemoved) return NotFound(`User with id ${body.id}`)

    return Ok()
}

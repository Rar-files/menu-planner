import { getServerSession } from 'next-auth'
import { authHookLogic } from './auth-logic'
import { authOptions } from '@/services/auth'

const useServerAuth = async () => {
    const session = await getServerSession(authOptions)

    return authHookLogic(session)
}

export { useServerAuth }

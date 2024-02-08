import { AuthContext } from '@/services/providers/web-app-providers.tsx/auth-provider'
import { useContext } from 'react'
import { authHookLogic } from './auth-logic'

const useAuth = () => {
    const session = useContext(AuthContext)
    return authHookLogic(session)
}

export { useAuth }

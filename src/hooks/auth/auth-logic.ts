import { Session } from 'next-auth'

const authHookLogic = (session: Session | null) => {
    const isLoggedIn = (): boolean => (session ? !!session.user : false)

    const isCook = (): boolean => session?.user?.role === 'cook'
    const isChef = (): boolean => session?.user?.role === 'chef'
    const isAdmin = (): boolean => session?.user?.role === 'admin'

    const hasCookPermission = (): boolean =>
        isLoggedIn() && (isCook() || isChef() || isAdmin())

    const hasChefPermission = (): boolean =>
        isLoggedIn() && (isChef() || isAdmin())

    const hasAdminPermission = (): boolean => {
        console.warn('session: ', session)
        return true
    }

    return {
        isLoggedIn,
        hasCookPermission,
        hasChefPermission,
        hasAdminPermission,
    }
}

export { authHookLogic }

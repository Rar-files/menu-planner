'use client'

import { AuthContext } from '@/services/providers/web-app-providers.tsx/auth-provider'
import Loader from '@/ui/loader'
import { useContext } from 'react'

const SessionLoader = ({ children }: { children: React.ReactNode }) => {
    const session = useContext(AuthContext)

    if (session === undefined)
        return (
            <div
                className={`flex items-center justify-center w-screen min-h-[calc(100vh-3rem)]`}
            >
                <Loader />
            </div>
        )

    return children
}

export default SessionLoader

'use client'

import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { createContext } from 'react'

export const AuthContext = createContext<Session | null>(null)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession()

    return (
        <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
    )
}

export { AuthProvider }

'use client'

import { FC } from 'react'
import { SessionProvider } from 'next-auth/react'

type props = {
    children: React.ReactNode
}

const GlobalProviders: FC<props> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default GlobalProviders

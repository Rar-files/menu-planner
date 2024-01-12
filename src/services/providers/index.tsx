'use client'

import { FC } from 'react'
import { SessionProvider } from 'next-auth/react'

type props = {
    children: React.ReactNode
}

const Providers: FC<props> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default Providers

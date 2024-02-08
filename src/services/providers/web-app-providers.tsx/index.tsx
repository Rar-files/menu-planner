'use client'

import { FC } from 'react'
import { SWRProvider } from './swr-provider'
import { AuthProvider } from './auth-provider'

type props = {
    children: React.ReactNode
}

const WebAppProviders: FC<props> = ({ children }) => {
    return (
        <SWRProvider>
            <AuthProvider>{children}</AuthProvider>
        </SWRProvider>
    )
}

export default WebAppProviders

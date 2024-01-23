'use client'

import { FC } from 'react'
import { SWRProvider } from './swr-provider'

type props = {
    children: React.ReactNode
}

const WebAppProviders: FC<props> = ({ children }) => {
    return <SWRProvider>{children}</SWRProvider>
}

export default WebAppProviders

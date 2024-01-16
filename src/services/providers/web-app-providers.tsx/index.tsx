'use client'

import { FC } from 'react'

type props = {
    children: React.ReactNode
}

const WebAppProviders: FC<props> = ({ children }) => {
    return <>{children}</>
}

export default WebAppProviders

import type { Metadata } from 'next'

import '@/styles/tailwind.css'
import MenuBar from '@/components/menu-bar'
import WebAppProviders from '@/services/providers/web-app-providers.tsx'

export const metadata: Metadata = {
    title: 'menu-planner',
    description: 'menu-planner',
}

const WebAppRootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <WebAppProviders>
            <MenuBar />
            {children}
        </WebAppProviders>
    )
}

export default WebAppRootLayout

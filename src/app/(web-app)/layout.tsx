import type { Metadata } from 'next'

import WebAppProviders from '@/services/providers/web-app-providers.tsx'
import SessionLoader from './session-loader'
import MenuBar from '@/components/menu-bar'

export const metadata: Metadata = {
    title: 'menu-planner',
    description: 'menu-planner',
}

const WebAppRootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <WebAppProviders>
            <SessionLoader>
                <MenuBar />
                <main
                    className={`flex justify-center w-screen min-h-[calc(100vh-3rem)]`}
                >
                    {children}
                </main>
            </SessionLoader>
        </WebAppProviders>
    )
}

export default WebAppRootLayout

import type { Metadata } from 'next'

import '@/styles/tailwind.css'
import MenuBar from '@/components/menu-bar'
import Providers from '@/services/providers'

export const metadata: Metadata = {
    title: 'menu-planner',
    description: 'menu-planner',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className={`bg-bg text-text-contrastText`}>
                <Providers>
                    <MenuBar />
                    {children}
                </Providers>
            </body>
        </html>
    )
}

export default RootLayout

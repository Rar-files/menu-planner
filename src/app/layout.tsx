import type { Metadata } from 'next'

import '@/styles/tailwind.css'
import Providers from '@/services/providers/global-providers.tsx'

export const metadata: Metadata = {
    title: 'menu-planner',
    description: 'menu-planner',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className={`bg-bg text-text-contrastText`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}

export default RootLayout

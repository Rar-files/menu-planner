import type { Metadata } from 'next'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
    title: 'menu-planner',
    description: 'menu-planner',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className={`bg-bg text-text-contrastText`}>{children}</body>
        </html>
    )
}

export default RootLayout

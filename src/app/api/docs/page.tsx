'use client'

import MenuDir from '@/components/api-docs/explorer/menu-dir'

export default function Home() {
    return (
        <MenuDir title="1">
            <MenuDir title="2">
                <MenuDir title="3"></MenuDir>
            </MenuDir>
            <MenuDir title="2">
                <MenuDir title="3"></MenuDir>
            </MenuDir>
        </MenuDir>
    )
}

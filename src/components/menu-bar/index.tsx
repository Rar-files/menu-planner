'use client'

import { FC } from 'react'
import Link from 'next/link'
import Menu from './menu'

const MenuBar: FC = () => {
    return (
        <>
            <nav
                className={`flex flex-row justify-between items-center fixed w-full h-12 p-2 bg-primary-light z-10`}
            >
                <Link href={'/'}>
                    <div
                        className={`flex flex-row items-center text-xl cursor-pointer`}
                    >
                        <span className={`icon-[mdi--silverware]`} />
                        <span className={`ml-1`}>Menu Planner</span>
                    </div>
                </Link>
                <Menu />
            </nav>
            <div className={`w-full h-12`} />
        </>
    )
}

export default MenuBar

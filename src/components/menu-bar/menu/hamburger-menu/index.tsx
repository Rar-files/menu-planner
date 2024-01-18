'use client'

import { useState } from 'react'
import { menuEndpoints } from '../menu-endpoints'
import HamburgerBtn from './hamburger-btn'

const HamburgerMenu = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className={`flex flex-col justify-start`}>
            <div
                onClick={() => setOpen(!open)}
                className={`flex flex-col cursor-pointer p-1 min-w-6 min-h-6`}
            >
                <div
                    className={`pl-4 pt-0.5 mb-1 bg-text-contrastText transform duration-150 ${
                        open ? 'rotate-45 translate-y-1.5 scale-x-125' : ''
                    }`}
                ></div>
                <div
                    className={`pl-4 pt-0.5 mb-1 bg-text-contrastText duration-50 ${
                        open ? 'invisible' : 'visible delay-50'
                    }`}
                ></div>
                <div
                    className={`pl-4 pt-0.5 bg-text-contrastText transform duration-150 ${
                        open ? '-rotate-45 -translate-y-1.5 scale-x-125' : ''
                    }`}
                ></div>
            </div>

            {/* <span className={`icon-[mdi--menu]`}></span> */}
            {open ? (
                <div
                    onClick={() => setOpen(false)}
                    className={`flex flex-col justify-between items-center fixed w-full h-auto top-12 right-0 left-0 z-20 mb-2`}
                >
                    {menuEndpoints.map((endpoint, index) => (
                        <HamburgerBtn
                            key={index}
                            name={endpoint.name}
                            href={endpoint.href}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default HamburgerMenu

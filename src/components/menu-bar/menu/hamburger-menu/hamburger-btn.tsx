import { IMenuEndpoint } from '@/types/IMenuEndpoint'
import Link from 'next/link'
import { FC } from 'react'

const HamburgerBtn: FC<IMenuEndpoint> = ({ name, href }) => {
    return (
        <Link href={href}>
            <button
                className={`w-screen h-auto p-2 bg-primary-dark hover:bg-primary text-text-contrastText`}
            >
                {name}
            </button>
        </Link>
    )
}
export default HamburgerBtn

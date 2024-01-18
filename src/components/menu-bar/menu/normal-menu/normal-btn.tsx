import { IMenuEndpoint } from '@/types/IMenuEndpoint'
import Link from 'next/link'
import { FC } from 'react'

const NormalMenu: FC<IMenuEndpoint> = ({ name, href }) => {
    return (
        <Link href={href}>
            <button
                className={`h-4 w-10 rounded-sm bg-primary-dark text-text-contrastText`}
            >
                {name}
            </button>
        </Link>
    )
}

export default NormalMenu

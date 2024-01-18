import { IMenuEndpoint } from '@/types/IMenuEndpoint'
import Link from 'next/link'
import { FC } from 'react'

const NormalMenu: FC<IMenuEndpoint> = ({ name, href }) => {
    return (
        <Link href={href}>
            <button
                className={`h-auto w-auto rounded-lg bg-primary hover:bg-primary-dark text-text-contrastText m-2 px-2 py-1`}
            >
                {name}
            </button>
        </Link>
    )
}

export default NormalMenu

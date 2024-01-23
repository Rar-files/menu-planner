import { FC } from 'react'

type Props = {
    children: React.ReactNode
    /** Width in tailwind string format. Example: "w-12"*/
    width?: string
}

const Cell: FC<Props> = ({ children, width }) => {
    return (
        <div
            className={`${
                width ? `${width} flex-auto` : `flex-1`
            } border-docsMethod-delete border-2`}
        >
            {children}
        </div>
    )
}

export default Cell

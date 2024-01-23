import Link from 'next/link'
import { FC } from 'react'
import TemplateRow from './template-row'

type Props = {
    children: React.ReactNode
    href?: string
}

const DataRow: FC<Props> = ({ href, ...props }) => {
    if (href)
        return (
            <Link href={href}>
                <BorderedRow {...props} />
            </Link>
        )

    return <BorderedRow {...props} />
}

const BorderedRow: FC<Props> = ({ ...props }) => {
    return (
        <div className={`flex flex-col`}>
            <TemplateRow {...props} />
            <div className={`pt-0.5 mx-1 bg-bg`} />
        </div>
    )
}

export default DataRow

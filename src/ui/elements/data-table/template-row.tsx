import { FC } from 'react'

type Props = {
    children: React.ReactNode
}

const TemplateRow: FC<Props> = ({ children }) => {
    return <div className={`flex flex-row px-2 py-1.5`}>{children}</div>
}

export default TemplateRow

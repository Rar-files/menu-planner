import { FC } from 'react'

type Props = {
    children: React.ReactNode
}

const TemplateRow: FC<Props> = ({ children }) => {
    return <div className={`flex flex-row`}>{children}</div>
}

export default TemplateRow

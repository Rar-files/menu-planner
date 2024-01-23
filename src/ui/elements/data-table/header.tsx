import { FC } from 'react'
import TemplateRow from './template-row'

type Props = {
    children: React.ReactNode
}

const Header: FC<Props> = ({ children }) => {
    return (
        <div className={`rounded-t-md bg-bg`}>
            <TemplateRow>{children}</TemplateRow>
        </div>
    )
}

export default Header

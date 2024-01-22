import { FC } from 'react'

type Props = {
    children: React.ReactNode
}

const ToolBar: FC<Props> = ({ children }) => {
    return <div className={`flex flex-row justify-end mt-2`}>{children}</div>
}

export default ToolBar

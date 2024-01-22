import { FC } from 'react'

type Props = {
    children: React.ReactNode
}

const ContentBox: FC<Props> = ({ children }) => {
    return <div className={`grow my-3 bg-bg-box rounded-lg`}>{children}</div>
}

export default ContentBox

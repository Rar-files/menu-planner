import { FC } from 'react'

type Props = {
    children: React.ReactNode
}

const DynamicArea: FC<Props> = ({ children }) => {
    return (
        <div className={`min-w-[calc(100vw-3rem)] shadow-lg flex flex-col`}>
            {children}
        </div>
    )
}

export default DynamicArea

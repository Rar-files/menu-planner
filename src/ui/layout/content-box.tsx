import { FC } from 'react'

type Props = {
    children: React.ReactNode
}

export const FullPageBox: FC<Props> = ({ children }) => {
    return <div className={`grow my-3 bg-bg-box rounded-lg`}>{children}</div>
}

export const CentredAutoSizeBox: FC<Props> = ({ children }) => {
    return (
        <div className={`flex justify-center items-center grow`}>
            <div className={`my-3 bg-bg-box rounded-lg`}>{children}</div>
        </div>
    )
}

export const AutoWidthBox: FC<Props> = ({ children }) => {
    return <div className={` my-3 bg-bg-box rounded-lg`}>{children}</div>
}

export default AutoWidthBox

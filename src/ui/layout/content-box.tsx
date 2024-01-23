import { FC } from 'react'

type Props = {
    children: React.ReactNode
}

export const FullPageBox: FC<Props> = ({ children }) => {
    return (
        <div className={`grow my-3 bg-bg-box rounded-lg p-2`}>{children}</div>
    )
}

export const CentredAutoSizeBox: FC<Props> = ({ children }) => {
    return (
        <div className={`flex justify-center items-start md:items-center grow`}>
            <div
                className={`grow my-3 bg-bg-box rounded-lg p-2 md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl md:w-screen`}
            >
                {children}
            </div>
        </div>
    )
}

export const AutoWidthBox: FC<Props> = ({ children }) => {
    return <div className={` my-3 bg-bg-box rounded-lg p-2`}>{children}</div>
}

export default AutoWidthBox

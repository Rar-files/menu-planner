import { FC } from 'react'

type Props = {
    message?: string
}

const Loader: FC<Props> = ({ message }) => {
    return (
        <div className="flex flex-col justify-center items-center h-full w-full">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-secondary" />
            {message ? (
                <div className={`m-2 text-text-comments font-semibold`}>
                    {message}
                </div>
            ) : null}
        </div>
    )
}

export default Loader

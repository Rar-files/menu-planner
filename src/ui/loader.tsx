import { FC } from 'react'

type Props = {
    message?: string
}

/**
 * Loader component that displays a spinning indicator
 * and optional message while content is loading.
 */
const Loader: FC<Props> = ({ message }) => {
    return (
        <div className="flex flex-col justify-center items-center h-full w-full">
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-primary" />
            {message ? (
                <div className={`m-2 text-text-comments font-semibold`}>
                    {message}
                </div>
            ) : null}
        </div>
    )
}

export default Loader

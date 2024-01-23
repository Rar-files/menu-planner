import { FC, forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
    children: React.ReactNode
    name: string
    label?: string
}

export const Template: FC<Props> = ({ children, label, name }) => {
    const {
        formState: { errors },
    } = useFormContext()

    const error = errors[name]?.message

    return (
        <div className={`flex flex-col justify-start w-full`}>
            <div className={`mb-1`}>{label}</div>
            {children}
            <div
                id="Error"
                className={`text-error font-semibold ${
                    error ? 'h-6' : 'h-3'
                } overflow-auto mb-1`}
            >
                {error ? `${errors[name]?.message}` : null}
            </div>
        </div>
    )
}

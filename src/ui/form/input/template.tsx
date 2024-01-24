import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
    children: React.ReactNode
    key: string
    label?: string
}

/**
 * Template component for rendering a form input with label and error message.
 * Accepts the form input component as children, plus label and form key props.
 * Renders the label, input, and error message from react-hook-form errors.
 */
export const Template: FC<Props> = ({ children, label, key }) => {
    const {
        formState: { errors },
    } = useFormContext()

    const error = errors[key]?.message

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
                {error ? `${errors[key]?.message}` : null}
            </div>
        </div>
    )
}

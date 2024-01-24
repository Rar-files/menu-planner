import { FC, InputHTMLAttributes } from 'react'
import { Template } from './template'
import { useFormContext } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    key: string
    label?: string
}

/**
 * TextField component.
 *
 * Accepts key, label, and other input props.
 * Renders an input wrapped in a Template.
 * Uses React Hook Form's register to register the input with provided key.
 */
const TextField: FC<Props> = ({ key, label, ...props }) => {
    const { register } = useFormContext()

    return (
        <Template key={key} label={label}>
            <input
                {...register(key)}
                {...props}
                className={`border-bg border-b-2 bg-opacity-0 bg-bg h-8 focus:bg-opacity-20 focus:outline-none`}
            />
        </Template>
    )
}

export default TextField

import { FC, InputHTMLAttributes } from 'react'
import { Template } from './template'
import { useFormContext } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    valueKey: string
    label?: string
}

/**
 * TextField component.
 *
 * Accepts key, label, and other input props.
 * Renders an input wrapped in a Template.
 * Uses React Hook Form's register to register the input with provided key.
 */
const TextField: FC<Props> = ({ valueKey, label, ...props }) => {
    const { register } = useFormContext()

    return (
        <Template valueKey={valueKey} label={label}>
            <input
                {...register(valueKey)}
                {...props}
                className={`border-bg border-b-2 bg-opacity-0 bg-bg h-8 focus:bg-opacity-20 focus:outline-none`}
            />
        </Template>
    )
}

export default TextField

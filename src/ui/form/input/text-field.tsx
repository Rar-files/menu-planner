import { FC, InputHTMLAttributes } from 'react'
import { Template } from './template'
import { useFormContext } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
}

const TextField: FC<Props> = ({ name, label, ...props }) => {
    const { register } = useFormContext()

    return (
        <Template name={name} label={label}>
            <input
                {...register(name)}
                {...props}
                className={`border-bg border-b-2 bg-opacity-0 bg-bg h-8 focus:bg-opacity-20 focus:outline-none`}
            />
        </Template>
    )
}

export default TextField

'use client'

import { FC, FormHTMLAttributes } from 'react'

interface Props extends FormHTMLAttributes<HTMLFormElement> {}

const Form: FC<Props> = ({ children, ...props }) => {
    return <form {...props}>{children}</form>
}

export default Form

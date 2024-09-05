'use client'

import { FC, FormHTMLAttributes } from 'react'

interface Props extends FormHTMLAttributes<HTMLFormElement> {}

/**
 * Main form component.
 *
 * Renders a <form> element with provided props and children.
 */
const Form: FC<Props> = ({ children, ...props }) => {
    return (
        <form {...props} className={`px-2 py-2`}>
            {children}
        </form>
    )
}

export default Form

import Link from 'next/link'
import { ButtonHTMLAttributes, FC } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string
    secondary?: boolean
    bold?: boolean
    outline?: boolean
    /** Icon name in Iconify tailwind format. Example: "icon-[mdi--silverware]"*/
    icon?: string
}

/**
 * Button component with various styling options.
 *
 * ButtonProps defines the props for the main Button component.
 * It extends ButtonHTMLAttributes to allow passing through all native button props.
 *
 * Added props:
 * - href: Renders a Next.js Link instead of a button
 * - secondary: Applies secondary theme styling
 * - bold: Makes text bold
 * - outline: Renders outline style button
 * - icon: Renders an icon
 *
 * StyledButton is an internal component that applies the various style props.
 */
const Button: FC<ButtonProps> = ({ href, ...props }) => {
    if (href) {
        return (
            <Link href={href} scroll={false}>
                <StyledButton {...props}></StyledButton>
            </Link>
        )
    }

    return <StyledButton {...props}></StyledButton>
}

interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    secondary?: boolean
    bold?: boolean
    outline?: boolean
    icon?: string
}

const StyledButton: FC<StyledButtonProps> = ({
    secondary,
    bold,
    icon,
    outline,
    children,
    ...props
}) => {
    return (
        <button
            {...props}
            className={`w-auto h-8 rounded-lg m-2 px-2 ${
                bold ? 'font-semibold' : null
            } ${
                secondary
                    ? `${
                          outline
                              ? ' border-secondary border-2 hover:bg-secondary'
                              : 'bg-secondary hover:bg-secondary-dark'
                      } `
                    : `${
                          outline
                              ? 'border-primary border-2 hover:bg-primary'
                              : 'bg-primary hover:bg-primary-dark'
                      }`
            } text-text-contrastText`}
        >
            <div className={`flex justify-center items-center h-full`}>
                {children}
                {icon && /icon-\[[^\]]*\]/.test(icon) ? (
                    <span className={`ml-1 ${icon}`} />
                ) : null}
            </div>
        </button>
    )
}

export default Button

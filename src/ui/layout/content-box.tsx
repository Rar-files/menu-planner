import { HTMLAttributes, FC } from 'react'

interface BoxProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * FullPageBox component renders a full page width box
 * with padding and background styling.
 */
export const FullPageBox: FC<BoxProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={`grow my-3 bg-bg-box rounded-lg p-2 ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

/**
 * CentredAutoSizeBox centers its children horizontally
 * and sizes them responsively based on screen size.
 */
export const CentredAutoSizeBox: FC<BoxProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div className={`flex justify-center items-start md:items-center grow`}>
            <div
                className={`grow my-3 bg-bg-box rounded-lg p-2 md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl md:w-screen ${className}`}
                {...props}
            >
                {children}
            </div>
        </div>
    )
}

/**
 * AutoWidthBox sizes its children responsively based on screen size.
 */
export const AutoWidthBox: FC<BoxProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={` my-3 bg-bg-box rounded-lg p-2 ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

interface DialogBoxProps extends BoxProps {
    onClose?: () => void
}

export const DialogBox: FC<DialogBoxProps> = ({
    children,
    onClose,
    className,
    ...props
}) => {
    return (
        <div
            className={`flex flex-col w-screen h-screen fixed top-0 left-0 ${className?.includes('z-') ? null : 'z-20'}`}
        >
            <div
                className={`fixed bg-bg opacity-50 z-10 w-full h-full`}
                onClick={onClose}
            />
            <CentredAutoSizeBox className={`z-20 ${className}`} {...props}>
                <div className={`flex justify-end`}>
                    <span
                        className={`icon-[mdi--close] cursor-pointer z-20 text-text-comments`}
                        onClick={onClose}
                    />
                </div>
                {children}
            </CentredAutoSizeBox>
        </div>
    )
}

export default AutoWidthBox

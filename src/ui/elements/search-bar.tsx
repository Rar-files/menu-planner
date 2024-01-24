import { InputHTMLAttributes, FC, useState } from 'react'

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
    /** Applies secondary theme styling. */
    secondary?: boolean
    /** Applies outline border styling.. */
    outline?: boolean
    /** Callback when close icon is clicked. */
    onClose?: () => void
}

/**
 * SearchBar component.
 * Renders an input with open/close icon for search.
 */
const SearchBar: FC<SearchBarProps> = ({
    secondary,
    outline,
    onClose,
    ...props
}) => {
    const [open, setOpen] = useState(false)

    return (
        <div
            className={`flex flex-row items-center w-auto h-8 rounded-lg m-2  ${
                secondary
                    ? `${
                          outline
                              ? ' border-secondary border-2 '
                              : 'bg-secondary '
                      } `
                    : `${outline ? 'border-primary border-2' : 'bg-primary'}`
            } text-text-contrastText`}
        >
            {open ? (
                <input
                    className={`ml-2 bg-opacity-0 bg-bg focus:outline-none border-text-contrastText border-r-2`}
                    {...props}
                ></input>
            ) : null}
            <div
                onClick={() => {
                    setOpen(!open)
                    open && onClose ? onClose() : null
                }}
                className={`p-2 h-full cursor-pointer flex items-center`}
            >
                {open ? (
                    <span className={`icon-[mdi--close]`} />
                ) : (
                    <span className={`icon-[mdi--magnify]`} />
                )}
            </div>
        </div>
    )
}

export default SearchBar

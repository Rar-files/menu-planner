import { FC } from 'react'

type Props = {
    children: React.ReactNode
}

/**
 * ToolBar component.
 *
 * Useful for rendering a toolbar at the top of a page.
 *
 * Renders a div with flex styling to layout child components in a row
 * justified to the end.
 */
const ToolBar: FC<Props> = ({ children }) => {
    return <div className={`flex flex-row justify-end mt-3`}>{children}</div>
}

export default ToolBar

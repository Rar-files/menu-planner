'use client'

import { useState } from 'react'

type DirProps = {
    path: string
    children?: React.ReactNode
}

const ExplorerDir = ({ path, children }: DirProps) => {
    const [opened, setOpened] = useState(false)
    const title = path.split('/').pop()!

    return (
        <div className="flex flex-col">
            <div
                className="mb-1 flex flex-row items-center cursor-pointer"
                onClick={() => {
                    opened ? setOpened(false) : setOpened(true)
                }}
            >
                <span
                    className={`icon-[mdi--chevron-right] m-1 duration-100 ${
                        opened ? 'rotate-90' : null
                    }`}
                />
                {'/' + title}
            </div>
            {opened ? (
                <div className={`ml-3 pl-3 border-l-2`}>{children}</div>
            ) : null}
        </div>
    )
}

export default ExplorerDir

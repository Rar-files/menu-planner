'use client'

import ExplorerDir from './explorer-dir'
import ExplorerItem from './explorer-item'

type DirProps = {
    fileTree: { path: string; dirs?: any; routes?: [] }
}

const Explorer = ({ fileTree }: DirProps) => {
    const getMappedExplorerTree = (fileTree: {
        path: string
        dirs?: any
        routes?: []
    }) => {
        return (fileTree.dirs as []).map(
            (dir: { path: string; dirs?: []; routes?: [] }, index: number) => {
                if (dir.dirs) {
                    return (
                        <ExplorerDir path={dir.path} key={index}>
                            {getMappedExplorerTree(dir)}
                        </ExplorerDir>
                    )
                }
                return (dir.routes as []).map((route: string) => {
                    return <ExplorerItem method={route} key={index} />
                })
            }
        )
    }

    return (
        <div className="flex flex-col">{getMappedExplorerTree(fileTree)}</div>
    )
}

export default Explorer

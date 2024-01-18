type DirProps = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | string
}

const ExplorerItem = ({ method }: DirProps) => {
    const getMethodColor = () => {
        switch (method) {
            case 'GET':
                return 'text-docsMethod-get'
            case 'POST':
                return 'text-docsMethod-post'
            case 'PUT':
                return 'text-docsMethod-put'
            case 'DELETE':
                return 'text-docsMethod-delete'
        }
    }

    return (
        <div
            className={`ml-2 mb-1 flex flex-row items-center ${getMethodColor()}`}
        >
            {method}
        </div>
    )
}

export default ExplorerItem

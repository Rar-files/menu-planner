import Explorer from '@/components/api-docs/api-explorer'
import { GetJSONTreeOfFiles } from './get-json-tree-of-files'
import { NextPage } from 'next'

const getAPIEndpoints = async () => {
    const apiFolderPath = 'api'
    return await GetJSONTreeOfFiles(apiFolderPath).catch(() => null)
}

const Docs: NextPage = async () => {
    const fileTree = await getAPIEndpoints()

    if (!fileTree) return <>Error</>

    return (
        <div>
            {' '}
            <div>{`/api`}</div>
            <Explorer fileTree={fileTree} />{' '}
        </div>
    )
}

export default Docs

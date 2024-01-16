import { lstatSync, readdirSync } from 'fs'

export const GetJSONTreeOfFiles = async (path: string) => {
    const files = readdirSync(`./src/app/${path}`)
    const filtredFiles = files
        .filter((file) => !(file == 'auth' || file == 'docs'))
        .filter((file) => !(file.slice(-3) == '.ts' && file != 'route.ts'))
    const data: any = await Promise.all(
        filtredFiles.map(async (file) => {
            if (!lstatSync(`./src/app/${path}/${file}`).isFile())
                return GetJSONTreeOfFiles(`${path}/${file}`)

            return await import(`@/app/${path}/${file}`).then((routes) => {
                return {
                    path: path,
                    routes: Object.keys(routes),
                }
            })
        })
    )

    return {
        path: path,
        dirs: data,
    }
}

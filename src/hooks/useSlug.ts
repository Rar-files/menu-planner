const useSlug = () => {
    const toSlug = (params: [string] | object) => {
        let slug = ''
        const array = Array.isArray(params) ? params : Object.values(params)

        for (const value of array) {
            slug += value
                .toString()
                .toLowerCase()
                .replace(/-/g, '')
                .replace(/[^\w-]+/g, '')
        }

        return slug
    }

    return { toSlug }
}

export { useSlug }

export const GetMealSlug = ({ name }: { name: string }) =>
    name
        .toLocaleLowerCase()
        .replace(/-/g, '')
        .replace(/[^\w-]+/g, '')

import { $Enums } from '@prisma/client'

export const GetMealSlug = ({
    name,
    type,
    date,
}: {
    name: string
    type: string | $Enums.MealType
    date: string | Date
}) => {
    if (date instanceof Date) {
        date = date.toISOString()
    }

    const slugName = name
        .toLocaleLowerCase()
        .replace(/-/g, '')
        .replace(/[^\w-]+/g, '')
    const slugType = type.toString().substring(0, 3)
    const slugDate = date.replace(/-/g, '').replace(/[^\w-]+/g, '')
    return `${slugName}-${slugType}-${slugDate}`
}

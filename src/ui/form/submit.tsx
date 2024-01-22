import { FC } from 'react'
import Button from '../button'

type Props = {
    text?: string
}

const Submit: FC<Props> = ({ text }) => {
    return (
        <Button type="submit" icon="icon-[mdi--chevron-right]">
            {text ? text : 'Submit'}
        </Button>
    )
}

export default Submit

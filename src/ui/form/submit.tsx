import { FC } from 'react'
import Button from '../elements/button'

type Props = {
    text?: string
}

const Submit: FC<Props> = ({ text }) => {
    return (
        <div className={`w-full flex justify-center`}>
            <Button type="submit" icon="icon-[mdi--chevron-right]">
                {text ? text : 'Submit'}
            </Button>
        </div>
    )
}

export default Submit

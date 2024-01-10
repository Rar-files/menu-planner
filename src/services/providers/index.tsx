import { FC } from 'react'

type props = {
    children: React.ReactNode
}

const Providers: FC<props> = ({ children }) => {
    return <>{children}</>
}

export default Providers

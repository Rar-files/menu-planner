import Button from '@/ui/button'
import { menuEndpoints } from './menu-endpoints'
import User from './user'

const NormalMenu = () => {
    return (
        <div className={`flex flex-row justify-end items-center w-full h-auto`}>
            {menuEndpoints.map((endpoint, index) => (
                <Button key={index} href={endpoint.href}>
                    {endpoint.name}
                </Button>
            ))}
            <div className={`h-10 m-1 p-px bg-primary`}></div>
            <User />
        </div>
    )
}

export default NormalMenu

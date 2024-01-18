import { menuEndpoints } from '../menu-endpoints'
import User from '../user'
import NormalBtn from './normal-btn'

const NormalMenu = () => {
    return (
        <div className={`flex flex-row justify-end items-center w-full h-auto`}>
            {menuEndpoints.map((endpoint, index) => (
                <NormalBtn
                    key={index}
                    name={endpoint.name}
                    href={endpoint.href}
                />
            ))}
            <div className={`h-10 m-1 p-px bg-primary`}></div>
            <User />
        </div>
    )
}

export default NormalMenu

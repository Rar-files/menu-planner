import LoginBtn from '../../login-btn'
import { menuEndpoints } from '../menu-endpoints'
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
        </div>
    )
}

export default NormalMenu

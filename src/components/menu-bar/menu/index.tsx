import HamburgerMenu from './hamburger-menu'
import NormalMenu from './normal-menu'

const Menu = () => {
    return (
        <div>
            <div className={`block md:hidden`}>
                <HamburgerMenu />
            </div>
            <div className={`hidden md:block`}>
                <NormalMenu />
            </div>
        </div>
    )
}

export default Menu

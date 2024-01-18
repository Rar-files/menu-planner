import HamburgerMenu from './hamburger-menu'
import NormalMenu from './normal-menu'

const Menu = () => {
    return (
        <div>
            <div className={`block sm:hidden`}>
                <HamburgerMenu />
            </div>
            <div className={`hidden sm:block`}>
                <NormalMenu />
            </div>
        </div>
    )
}

export default Menu

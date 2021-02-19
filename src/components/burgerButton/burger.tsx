import * as React from 'react';
import './style.scss';

interface BurgerButtonProps {
    openBurger: Function,
    openMenu: boolean
}

export const BurgerButton: React.FC<BurgerButtonProps> = ({ openBurger, openMenu }) => {

    return (
        <div className="burgerButton">
            <input onChange={e => openBurger(e.target.checked)} checked={openMenu} type="checkbox" name="burger" id="burger" />
            <label htmlFor="burger" id="nav-icon1">
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>
    )
};